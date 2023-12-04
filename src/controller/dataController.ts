import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import DataService from '../service/dataService';

const dataService = new DataService();

class DataController {
	async dailyNum(ctx: Context) {
		try {
			const res = await dataService.getDailyNum();
			if (res) ctx.body = new Result(200, '获取今日访问量成功', res);
			else ctx.body = new Result(70002, '获取今日访问量失败', 'fail');
		} catch (error) {
			ctx.app.emit('error', ERROR.getWebsiteInfoError, ctx, error);
		}
	}

	async blogClassifiy(ctx: Context) {
		try {
			const res = await dataService.getBlogClassifiy();
			if (res) ctx.body = new Result(200, '获取分类文章比例成功', res);
			else ctx.body = new Result(70002, '获取分类文章比例失败', 'fail');
		} catch (error) {
			ctx.app.emit('error', ERROR.getWebsiteInfoError, ctx, error);
		}
	}

	async moduleNum(ctx: Context) {
		try {
			const res = await dataService.getModuleNum();
			if (res) ctx.body = new Result(200, '获取各模块数量成功', res);
			else ctx.body = new Result(70002, '获取各模块数量失败', 'fail');
		} catch (error) {
			ctx.app.emit('error', ERROR.getWebsiteInfoError, ctx, error);
		}
	}

    async hotBlog(ctx: Context) {
		try {
			const res = await dataService.getHotBlog();
			if (res) ctx.body = new Result(200, '获取热门文章排行成功', res);
			else ctx.body = new Result(70002, '获取热门文章排行失败', 'fail');
		} catch (error) {
			ctx.app.emit('error', ERROR.getWebsiteInfoError, ctx, error);
		}
	}
}

export default DataController;
