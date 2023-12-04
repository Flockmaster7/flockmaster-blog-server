import { uid } from 'uid';
import redis from '../../db/redis';
import Common from '../../model/Common';
import { WebsiteType } from '../../types';
import Comment from '../../model/Comment';
import Blog from '../../model/Blog';
import BlogService from '../blogService';
import CommentServiceImpl from './CommentServiceImpl';
import CommonService from '../CommonService';
import TagServiceImpl from './TagServiceImpl';
import WorkServiceImpl from './WorkServiceImpl';
import LeaveWordsServiceImpl from './LeaveWordsServiceImpl';

class CommonServiceImpl implements CommonService {
	commentService: CommentServiceImpl = new CommentServiceImpl();
	blogService: BlogService = new BlogService();
	tagService: TagServiceImpl = new TagServiceImpl();
	workService: WorkServiceImpl = new WorkServiceImpl();
	leaveWordsService: LeaveWordsServiceImpl = new LeaveWordsServiceImpl();

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

	// 获取网站资讯
	async getWebsite(): Promise<WebsiteType> {
		const website_tags = await this.tagService.getTagsCount();
		const website_blogs = await this.blogService.getBlogCount();
		const website_works = await this.workService.getWorkCount();
		const website_leaveWords =
			await this.leaveWordsService.getLeaveWordCount();

		const res = {
			website_tags,
			website_blogs,
			website_works,
			website_leaveWords
		};

		// 先查询redis
		const num = await redis.get('website_visit_num');
		if (!num) {
			// redis没有
			const realNum = await Common.findOne({
				where: {
					id: 1
				}
			});
			return {
				...res,
				website_visit: realNum?.dataValues.website_views!,
				website_visit_today: 1
			};
		}
		const num_today = await redis.pfcount('website_visit');
		return {
			...res,
			website_visit: num,
			website_visit_today: num_today
		};
	}

	// 将访问量写入数据库
	async addVisitNum(num: number): Promise<boolean> {
		const common = new Common();
		common.setWebsiteViews(num);
		const res = await Common.update(common, {
			where: {
				id: 1
			}
		});
		return res[0] ? true : false;
	}

	async getLatestComments(): Promise<Comment[]> {
		const res = await this.commentService.getLatestComment(1, 3);
		return res;
	}

	async getHotBlogs(): Promise<Blog[]> {
		const res = await this.blogService.getHotBlogList(1, 5);
		return res;
	}
}

export default CommonServiceImpl;
