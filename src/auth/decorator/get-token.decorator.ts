import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { TokenType } from "src/modules/backlist/interface/token.interface";

export const GetToken = createParamDecorator(
	( data, ctx: ExecutionContext )=>{

		const req = ctx.switchToHttp().getRequest();
		const token = req.headers.authorization;

		if( !token ) throw new InternalServerErrorException('Token not found');

		return { token: token?.replace('Bearer ', '') } as TokenType;
	}
)