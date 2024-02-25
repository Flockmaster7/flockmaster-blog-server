import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import { Upload, WebsiteType } from '../types';
import CommonServiceImpl from '../service/Implement/CommonServiceImpl';
import Comment from '../model/Comment';
import Blog from '../model/Blog';
import { uploadFile } from '../utils/Cos';

const commonService: CommonServiceImpl = new CommonServiceImpl();

class CommonController {
	async upload(ctx: Context) {
		try {
			const res: Upload = {
				images: [],
				videos: []
			};
			if (ctx.state.imageList.length !== 0) {
				for (const item of ctx.state.imageList) {
					await uploadFile(item.filepath, item.newFilename, 'images');
					res.images.push({
						imageUrl: `https://ggkt-atguigu-1313888024.cos.ap-guangzhou.myqcloud.com/flockmaster-blogs/images/${item.newFilename}`
					});
				}
			}
			if (ctx.state.videoList.length !== 0) {
				for (const item of ctx.state.videoList) {
					await uploadFile(item.filepath, item.newFilename, 'videos');
					res.videos.push({
						videoUrl: `https://ggkt-atguigu-1313888024.cos.ap-guangzhou.myqcloud.com/flockmaster-blogs/videos/${item.newFilename}`
					});
				}
			}
			ctx.body = new Result(200, '上传成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.uploadError, ctx, error);
		}
	}

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
			const res = await commonService.getHotBlogs();
			ctx.body = new Result<Blog[]>(200, '获取首页热门文章成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getgetHotBlogsError, ctx, error);
		}
	}
}

export default CommonController;
