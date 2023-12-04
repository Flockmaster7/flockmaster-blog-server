import { uid } from 'uid';
import redis from '../db/redis';
import Common from '../model/Common';
import { WebsiteType } from '../types';
import { Sequelize } from 'sequelize-typescript';
import Blog from '../model/Blog';
import Album from '../model/Album';
import LeaveWords from '../model/LeaveWords';
import Tag from '../model/Tag';
import Work from '../model/Work';
import BlogService from './blogService';

const blogService = new BlogService();

class CommonService {
	// 增加网站访问量
	async addWebsiteVisit(userAgent: string): Promise<boolean> {
		const id = uid();
		const res = await redis.pfadd('website_visit', id);
		if (res) {
			const num = await redis.get('website_visit_num');
			if (!num) {
				// redis没有
				const common = await Common.findByPk(1);
				if (common)
					redis.set(
						'website_visit_num',
						common?.dataValues.website_views + 1
					);
			} else {
				await redis.set('website_visit_num', num ? Number(num) + 1 : 1);
			}
		}
		return res > 0 ? true : false;
	}

	async getDailyNum(): Promise<Partial<WebsiteType>> {
		const num_today = await redis.pfcount('website_visit');
		return {
			website_visit_today: num_today
		};
	}

	async getBlogClassifiy(): Promise<any> {
		const data = [
			{
				classify: '1',
				articleCount: 0
			},
			{
				classify: '2',
				articleCount: 0
			},
			{
				classify: '3',
				articleCount: 0
			},
			{
				classify: '4',
				articleCount: 0
			},
			{
				classify: '5',
				articleCount: 0
			}
		];
		const res = await Blog.findAll({
			attributes: [
				'classify',
				[Sequelize.fn('COUNT', Sequelize.col('id')), 'articleCount']
			],
			group: ['classify'],
			raw: true
		});
		res.forEach((item, index) => {
			if (item.classify === data[index].classify) {
				data[index].articleCount = item.articleCount!;
			}
		});
		return data;
	}

	async getModuleNum(): Promise<any> {
		const albumCount = await Album.count();
		const blogCount = await Blog.count();
		const leaveWordCount = await LeaveWords.count();
		const tagCount = await Tag.count();
		const workCount = await Work.count();

		return {
			blogCount,
			tagCount,
			workCount,
			albumCount,
			leaveWordCount
		};
	}

	async getHotBlog(): Promise<any> {
		const { rows } = await blogService.getBlogList(1, 5, {
			orderByRead: true
		});
		const data = rows.map((item) => {
			return {
				name: item.dataValues.title,
				value: item.dataValues.blog_read,
				percentage: (
					(+item.dataValues.blog_like / +item.dataValues.blog_read) *
					100
				).toFixed(2),
				maxValue: 100000
			};
		});
		return data;
	}
}

export default CommonService;
