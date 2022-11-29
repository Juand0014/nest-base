import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetToken = createParamDecorator(
	( data, ctx: ExecutionContext )=>{

		const req = ctx.switchToHttp().getRequest();
		const token: string = req.headers.authorization;

		if( !token ) throw new InternalServerErrorException('Token not found');

		return token?.replace('Bearer ', '');
	}
)