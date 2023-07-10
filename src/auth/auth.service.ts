import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BlacklistService } from 'src/modules/backlist/blacklist.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserAuth } from './entities/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userModel: Repository<UserAuth>,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}
  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...rest } = createAuthDto;

      const user = this.userModel.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userModel.save(user);
      delete user.password;

      const token = this.getJwtToken({ id: user.id });
      return {
        ...rest,
        token,
      };
    } catch (error) {
      this.handlerDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel
      .findOne(
        { email: email },
        {
          password: true,
          email: true,
          id: true,
        },
      )
      .select([
        '-__v',
        '-createdAt',
        '-updatedAt',
        '-isActive',
        '-created_by',
        '-updated_by',
      ])
      .exec();
    if (!user) throw new BadRequestException('Invalid credentials');

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');
    delete user.password;

    return {
      ...user.toJSON(),
      token: this.jwtService.sign({ _id: user._id }),
    };
  }

  async refreshToken(user: UserAuth, passToken: string) {
    const token: string = this.getJwtToken({ id: user.id });
    this.blacklistService.logoutUser(passToken);
    return {
      token
    };
  }

  async logout(token: string) {
    this.blacklistService.logoutUser(token);
    return {
      message: 'Logout successfully',
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handlerDBErrors(error: any): never {
    if (error.code === 11000)
      throw new BadRequestException(
        `This property exist in database ${JSON.stringify(error.keyValue)}`,
      );
    if (error.code === '23505') throw new BadRequestException(error.detail);
    Logger.error(error, `Table - (${error.table.toLowerCase()})`);

    throw new InternalServerErrorException('Please check server logs');
  }
}
