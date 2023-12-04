import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import { WebsiteType } from '../types';
import CommonServiceImpl from '../service/Implement/CommonServiceImpl';
import Comment from '../model/Comment';
import Blog from '../model/Blog';

const commonService: CommonServiceImpl = new CommonServiceImpl();

class CommonController {
	// 增加网站访问量
	public async addVisit(ctx: Context) {
		try {
			const userAgent = ctx.request.header['user-agent'];
			const res = await commonService.addWebsiteVisit(userAgent!);
			if (res)
				ctx.body = new Result<string>(
					200,
					'增加网站访问量成功',
					'success'
				);
			else
				ctx.body = new Result<string>(
					70001,
					'增加网站访问量失败',
					'fail'
				);
		} catch (error) {
			ctx.app.emit('error', ERROR.addVisitError, ctx, error);
		}
	}

	// 获取网站资讯
	public async getWebsiteInfo(ctx: Context) {
		try {
			const res = await commonService.getWebsite();
			if (res)
				ctx.body = new Result<WebsiteType>(
					200,
					'获取网站资讯成功',
					res
				);
			else
				ctx.body = new Result<string>(
					70002,
					'获取网站资讯失败',
					'fail'
				);
		} catch (error) {
			ctx.app.emit('error', ERROR.getWebsiteInfoError, ctx, error);
		}
	}

	// 获取首页最新评论
	public async getLatestComment(ctx: Context) {
		try {
			const res = await commonService.getLatestComments();
			ctx.body = new Result<Comment[]>(200, '获取首页最新评论成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getLatestCommentError, ctx, error);
		}
	}

	public async getHotBlogs(ctx: Context) {
		try {
			console.log(commonService);
			const res = await commonService.getHotBlogs();
			ctx.body = new Result<Blog[]>(200, '获取首页热门文章成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getgetHotBlogsError, ctx, error);
		}
	}
}

export default CommonController;
