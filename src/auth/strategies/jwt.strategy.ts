import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserAuth } from '../entities/user.entity';
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
	
	constructor(
		@InjectModel(UserAuth.name)
    private readonly userModel: Model<UserAuth>,

		configServices: ConfigService
	) {
		super({
			secretOrKey: configServices.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		});
	}

	async validate(payload: JwtPayload): Promise<UserAuth>{
		const { _id } = payload;
		const user = await this.userModel.findById(_id);
		
		if( !user ) 
			throw new UnauthorizedException('Token not valid');

		if( !user.isActive )
			throw new UnauthorizedException('User is inactive, talk with an admin');

		return user;
	}

}