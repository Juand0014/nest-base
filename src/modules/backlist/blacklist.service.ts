import { Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlackList } from './entities/blacklist.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BlacklistService {
	constructor(
		@InjectModel(BlackList.name)
		private readonly blacklistModel: Model<BlackList>,
	){}

	async logoutUser(token: string): Promise<BlackList> {
		const blacklist = await this.blacklistModel.create({token});
		return blacklist;
	}

	async isTokenBlacklisted(token: string): Promise<boolean> {
		const blacklist = await this.blacklistModel.findOne({ token
		}).exec();

		return !!blacklist;
	}

  @Cron("*/45 * * * * *")
	async deleteTokenBefore2Hours(): Promise<void> {
		const date = new Date();
		date.setHours(date.getHours() - 2);
		const tokensDeleted = await this.blacklistModel.deleteMany({ createdAt: { $lt: date } }).exec();
		if( tokensDeleted.deletedCount ) Logger.log(`Tokens deleted: ${ tokensDeleted.deletedCount }`);
	}
}
