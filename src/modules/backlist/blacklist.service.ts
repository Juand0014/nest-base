import { Injectable } from '@nestjs/common';
import { BlackList } from './entities/blacklist.entity';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlacklistService {
	constructor(
		@InjectRepository(BlackList)
		private readonly blacklistModel: Repository<BlackList>,
	){}

	async logoutUser(token: string): Promise<BlackList> {
		const blacklist = await this.blacklistModel.create({ token });
		return blacklist;
	}

	async isTokenBlacklisted(token: string): Promise<boolean> {
		const blacklist = await this.blacklistModel.findOne({
			where: { token }
		});
		return !!blacklist;
	}

  @Cron("*/45 * * * * *")
	async deleteTokenBefore2Hours(): Promise<void> {
		const date = new Date();
		date.setHours(date.getHours() - 2);

		const tokensDeleted = await this.blacklistModel
		.createQueryBuilder('blacklist')
		.where('blacklist.created_at <= :date', { date })
		.getMany();

		await this.blacklistModel.remove(tokensDeleted);
	}
}
