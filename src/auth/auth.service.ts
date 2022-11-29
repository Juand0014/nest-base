import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { BlacklistService } from 'src/modules/backlist/blacklist.service';
import { TokenType } from 'src/modules/backlist/interface/token.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { UserAuth } from './entities/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAuth.name)
    private readonly userModel: Model<UserAuth>,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}
  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...rest } = createAuthDto;

      const user = new this.userModel({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      });

      await user.save();
      delete user.password;

      const token = this.getJwtToken({ _id: user._id });
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

  async refreshToken(user: UserAuth, passToken: TokenType) {
    const token: string = this.getJwtToken({ _id: user._id });
    this.blacklistService.logoutUser(passToken);
    return {
      token
    };
  }

  async logout(passToken: TokenType) {
    this.blacklistService.logoutUser(passToken);
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
