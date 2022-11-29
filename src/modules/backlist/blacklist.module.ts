import { Module, forwardRef } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { blacklistController } from './blacklist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlackListSchema } from './entities/blacklist.entity';
import { AuthModule } from '../../auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BlackList', schema: BlackListSchema }]),
    ScheduleModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [blacklistController],
  providers: [BlacklistService],
  exports: [BlacklistService, MongooseModule]
})
export class BlacklistModule {}
