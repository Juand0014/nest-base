import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserAuth } from '../entities/user.entity';
import { META_ROLES } from '../decorator/role-protected.decorator';
import { BlacklistService } from 'src/modules/backlist/blacklist.service';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
      private readonly reflector: Reflector,
      private readonly blacklistServices: BlacklistService
    ){

  }
  async canActivate(
    context: ExecutionContext,
  ){

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

    const req = context.switchToHttp().getRequest();
    const token: string = req.headers.authorization?.replace('Bearer ', '');
		const user = req.user as UserAuth;

    const isBlacklisted = await this.blacklistServices.isTokenBlacklisted(token);
    
    if( !user )
    throw new BadRequestException('User not found');
    
    if(isBlacklisted){
      throw new ForbiddenException('Token is blacklisted');
    }

    if( !validRoles || validRoles.length === 0)
    return true;
    
    for (const role of user.roles) {
      if( validRoles.includes( role )){
        return true
      }
    }

    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ validRoles }]`
    )
  }
}
