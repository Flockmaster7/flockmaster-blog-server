import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import BlogService from '../service/blogService';
import { uploadFile } from '../utils/Cos';
import TagServiceImpl from '../service/Implement/TagServiceImpl';
import Blog from '../model/Blog';

const blogService = new BlogService();
const tagService = new TagServiceImpl();

class BlogController {
	// 上传图片
	async uploadBlogImg(ctx: Context) {
		try {
			const blog_img = ctx.state.blog_img;
			// 上传到腾讯云cos
			await uploadFile(blog_img.filepath, blog_img.newFilename, 'images');
			const res = {
				blog_img: `/flockmaster-blogs/images/${blog_img.newFilename}`
			};
			ctx.body = new Result(200, '上传图片成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.uploadError, ctx, error);
		}
	}

	// 上传md文件
	async uploadBlog(ctx: Context) {
		try {
			const { blogHtml, content } = ctx.state.dataBlog;
			const res = {
				content_html: blogHtml,
				content_text: content
			};
			ctx.body = new Result(200, '上传文件成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.uploadError, ctx, error);
		}
	}

	// 添加博客
	async createBlog(ctx: Context) {
		try {
			const {
				title,
				classify,
				blog_image,
				content_html,
				content_text,
				tags
			} = ctx.request.body;
			const user = ctx.state.user;
			const params = {
				author: user.name,
				user_id: user.id,
				title,
				classify,
				blog_image,
				content_html,
				content_text
			};
			const res = await blogService.createBlog(params, tags, user.id);
			if (res) ctx.body = new Result(200, '发布博客成功', 'success');
			else ctx.body = new Result(20004, '发布博客失败', 'fail');
		} catch (error) {
			ctx.app.emit('error', ERROR.createBlogError, ctx, error);
		}
	}

	// 删除博客
	async removeBlog(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await blogService.deleteBlog(id);
			if (res) {
				ctx.body = new Result(200, '删除博客成功', 'success');
			} else {
				ctx.body = new Result(30012, '删除博客失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.deleteBlogError, ctx, error);
		}
	}

	// 获取博客列表
	async getBlogList(ctx: Context) {
		try {
			const { pageSize, pageNum } = ctx.params;
			const wrapper = {};
			if (ctx.request.body) {
				const {
					content_text,
					author,
					title,
					order,
					classify,
					tags,
					user_id,
					querySearch,
					orderByRead
				} = ctx.request.body;
				orderByRead && Object.assign(wrapper, { orderByRead });
				querySearch && Object.assign(wrapper, { querySearch });
				content_text && Object.assign(wrapper, { content_text });
				author && Object.assign(wrapper, { author });
				title && Object.assign(wrapper, { title });
				order && Object.assign(wrapper, { order });
				classify && Object.assign(wrapper, { classify });
				tags && Object.assign(wrapper, { tags });
				user_id && Object.assign(wrapper, { user_id });
			}
			const data = await blogService.getBlogList(
				pageNum,
				pageSize,
				wrapper
			);
			ctx.body = new Result(200, '获取博客列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getBlogListError, ctx, error);
		}
	}

	// 获取博客详情
	async getBlogDetail(ctx: Context) {
		try {
			const { id } = ctx.params;
			if (!id)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			console.log(id);
			const data = await blogService.getBlogInfo(id * 1);
			if (data) {
				// 获取博客对应的标签
				const tags = await blogService.getBlog_tag(id * 1);
				let idList: number[] = [];
				if (tags) {
					tags.forEach((item) => {
						idList.push(item.dataValues.tag_id);
					});
					const tagData = await tagService.getTagListByIdList(idList);
					const res = { ...data, tags: tagData };
					ctx.body = new Result(200, '获取文章详情成功', res);
				} else {
					ctx.body = new Result(200, '获取文章详情成功', {
						...data,
						tags: []
					});
				}
			} else {
				ctx.app.emit('error', ERROR.getBlogDetailError, ctx);
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.getBlogDetailError, ctx, error);
		}
	}

	// 获取标签对应博客列表
	async getBlogListByTagId(ctx: Context) {
		try {
			const { pageNum, pageSize } = ctx.params;
			const { tags } = ctx.request.body;
			console.log(ctx.request.body, tags);
			const data = await blogService.getBlogListByTag(
				tags,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取博客列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getBlogListError, ctx, error);
		}
	}

	//增加文章阅读量
	async addBlogRead(ctx: Context) {
		try {
			const { id } = ctx.params;
			const res = await blogService.addRead(id * 1);
			if (res) {
				ctx.body = new Result(200, '增加阅读量成功', 'success');
			} else {
				ctx.body = new Result(30013, '增加阅读量失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.addBlogReadError, ctx, error);
		}
	}

	// 文章点赞
	async likeBlog(ctx: Context) {
		try {
			const { id } = ctx.params;
			const user = ctx.state.user;
			const res = await blogService.likeArticle(id * 1, user);
			if (res) {
				ctx.body = new Result(200, '点赞成功', 'success');
			} else {
				ctx.body = new Result(30013, '点赞失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.likeBlogError, ctx, error);
		}
	}

	// 文章取消点赞
	async unlikeBlog(ctx: Context) {
		try {
			const { id } = ctx.params;
			const user = ctx.state.user;
			const res = await blogService.unlikeArticle(id * 1, user);
			if (res) {
				ctx.body = new Result(200, '取消点赞成功', 'success');
			} else {
				ctx.body = new Result(30013, '取消点赞失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.unlikeBlogError, ctx, error);
		}
	}

	// 获取点赞的文章列表
	async getUserLikeList(ctx: Context) {
		try {
			const { pageNum, pageSize } = ctx.params;
			const { id } = ctx.state.user;
			const data = await blogService.getLikeList(
				id * 1,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取博客列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getUserLikeListError, ctx, error);
		}
	}

	// 获取某一文章点赞用户列表
	async getBlogLikeUserList(ctx: Context) {
		try {
			const { id, pageNum, pageSize } = ctx.params;
			const data = await blogService.getLikeUserList(
				id * 1,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取用户列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getBlogLikeUserListError, ctx, error);
		}
	}

	// 文章收藏
	async collectBlog(ctx: Context) {
		try {
			const { id } = ctx.params;
			const user = ctx.state.user;
			const res = await blogService.collectArticle(id * 1, user);
			if (res) {
				ctx.body = new Result(200, '收藏成功', 'success');
			} else {
				ctx.body = new Result(30013, '收藏失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.collectBlogError, ctx, error);
		}
	}

	// 文章取消收藏
	async uncollectBlog(ctx: Context) {
		try {
			const { id } = ctx.params;
			const user = ctx.state.user;
			const res = await blogService.uncollectArticle(id * 1, user);
			if (res) {
				ctx.body = new Result(200, '取消收藏成功', 'success');
			} else {
				ctx.body = new Result(30013, '取消收藏失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.uncollectBlogError, ctx, error);
		}
	}

	// 获取收藏的文章列表
	async getUserCollectList(ctx: Context) {
		try {
			const { pageNum, pageSize } = ctx.params;
			const { id } = ctx.state.user;
			const data = await blogService.getCollectList(
				id * 1,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取博客列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getUserCollectListError, ctx, error);
		}
	}

	// 获取某一文章收藏用户列表
	async getBlogCollectUserList(ctx: Context) {
		try {
			const { id, pageNum, pageSize } = ctx.params;
			const data = await blogService.getCollectUserList(
				id * 1,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取用户列表成功', data);
		} catch (error) {
			ctx.app.emit(
				'error',
				ERROR.getBlogCollectUserListError,
				ctx,
				error
			);
		}
	}

	// 是否点赞
	async isLike(ctx: Context) {
		try {
			const id = ctx.params.id;
			const user = ctx.state.user;
			const res = await blogService.getIsLikeStatus(id * 1, user.id);
			ctx.body = new Result(200, '获取状态成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getStatusError, ctx, error);
		}
	}

	// 是否收藏
	async isCollect(ctx: Context) {
		try {
			const id = ctx.params.id;
			const user = ctx.state.user;
			const res = await blogService.getIsCollectStatus(id * 1, user.id);
			ctx.body = new Result(200, '获取状态成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getStatusError, ctx, error);
		}
	}

	// 获取某一用户博客列表
	async getUserBlogList(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await blogService.getBlogListByUserId(id * 1);
			ctx.body = new Result(200, '获取博客列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getBlogListError, ctx, error);
		}
	}

	// 获取推荐文章
	async getRecommendBlogList(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await blogService.getRecommendBlog(id * 1);
			if (res) {
				ctx.body = new Result(200, '获取推荐文章成功', res);
			} else {
				ctx.body = new Result(30020, '没有找到该id对应的文章', '');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.getRecommendBlogListError, ctx, error);
		}
	}

	async topBlog(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const blog = new Blog();
			blog.id = id;
			blog.top = 1;
			const res = await blogService.updateBlog(blog);
			if (res) {
				ctx.body = new Result<string>(200, '置顶成功', 'success');
			} else {
				throw new Error('置顶失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.topBlogError, ctx, error);
		}
	}

	async cancelTopBlog(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const blog = new Blog();
			blog.id = id;
			blog.top = 0;
			const res = await blogService.updateBlog(blog);
			if (res) {
				ctx.body = new Result<string>(200, '取消置顶成功', 'success');
			} else {
				throw new Error('取消置顶失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.cancelTopBlogError, ctx, error);
		}
	}
}

export default BlogController;
