import { Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenType } from './interface/token.interface';
import { BlackList } from './entities/blacklist.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BlacklistService {
	constructor(
		@InjectModel(BlackList.name)
		private readonly blacklistModel: Model<BlackList>,
	){}

	async logoutUser(token: TokenType): Promise<BlackList> {
		const blacklist = await this.blacklistModel.create(token);
		return blacklist;
	}

	async isTokenBlacklisted(token: TokenType): Promise<boolean> {
		const blacklist = await this.blacklistModel.findOne({ token
		}).exec();

		console.log(blacklist);

		return !!blacklist;
	}

  @Cron("*/1 * * * * *")
	async deleteTokenBefore2Hours(): Promise<void> {
		const date = new Date();
		date.setHours(date.getHours() - 2);
		const tokensDeleted = await this.blacklistModel.deleteMany({ createdAt: { $lt: date } }).exec();
		if( tokensDeleted.deletedCount ) Logger.log(`Tokens deleted: ${ tokensDeleted.deletedCount }`);
	}
}
