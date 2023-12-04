import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import TagServiceImpl from '../service/Implement/TagServiceImpl';

const tagService = new TagServiceImpl();

class TagController {
	// 添加标签
	async createTag(ctx: Context) {
		try {
			const { tag_name, tag_color, tag_classify } = ctx.request.body;
			const params = {
				tag_name,
				tag_color,
				tag_classify
			};
			const data = await tagService.addTag(params);
			ctx.body = new Result(200, '添加标签成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.createTagError, ctx, error);
		}
	}

	// 修改标签
	async updateTag(ctx: Context) {
		try {
			const { id, tag_name, tag_color, tag_classify } = ctx.request.body;
			let params = {};
			if (!id) return ctx.app.emit('error', ERROR.FormValidatorError, '');
			tag_name && Object.assign(params, { tag_name });
			tag_color && Object.assign(params, { tag_color });
			tag_classify && Object.assign(params, { tag_classify });
			const res = await tagService.modifyTag(id, params);
			if (res) {
				ctx.body = new Result(200, '修改标签成功', 'success');
			} else {
				ctx.body = new Result(30009, '修改标签失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateTagError, ctx, error);
		}
	}

	// 删除标签
	async removeTag(ctx: Context) {
		try {
			const { id } = ctx.params;
			const res = await tagService.deleteTag(id * 1);
			if (res) {
				ctx.body = new Result(200, '删除标签成功', 'success');
			} else {
				ctx.body = new Result(30010, '删除标签失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeTagError, ctx, error);
		}
	}

	// 获取标签列表
	async getTagList(ctx: Context) {
		try {
			const { pageSize, pageNum } = ctx.params;
			const data = await tagService.getList(pageNum * 1, pageSize * 1);
			ctx.body = new Result(200, '获取标签列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getTagListError, ctx, error);
		}
	}

	// 获取当前博客标签列表
	async getCurrentTagList(ctx: Context) {}
}

export default TagController;
