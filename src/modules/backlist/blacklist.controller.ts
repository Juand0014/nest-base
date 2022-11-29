import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { BlacklistService } from './blacklist.service';

@Auth()
@ApiBearerAuth()
@ApiTags('Blacklist')
@Controller('blacklist')
export class blacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}
  
  @Post()
  logoutUser(@Body() token: string) {
    return this.blacklistService.logoutUser(token);
  }

  @Get(':token')
  isTokenBlacklisted(@Param('token') token: string) {
    return this.blacklistService.isTokenBlacklisted(token);
  }
}
