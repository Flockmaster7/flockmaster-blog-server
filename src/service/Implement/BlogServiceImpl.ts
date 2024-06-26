import Blog from '../../model/Blog';
import Blog_Tag from '../../model/Blog_Tag';
import { BlogFind, BlogObject, Blog_tagType } from '../../types/blog';
import { Op } from 'sequelize';
import Tag from '../../model/Tag';
import User from '../../model/User';
import User_Blog_Like from '../../model/User_Blog_Like';
import User_Blog_Collect from '../../model/User_Blog_Collect';
import sequelize from '../../db/mysql';
import BolgTagServiceImpl from './BlogTagServiceImpl';
import UserBlogLikeServiceImpl from './UserBlogLikeServiceImpl';
import UserBlogCollectServiceImpl from './UserBlogCollectServiceImpl';
import BlogService from '../BlogService';

class BlogServiceImpl implements BlogService {
	blogTagService: BolgTagServiceImpl = new BolgTagServiceImpl();
	userBlogLikeService: UserBlogLikeServiceImpl =
		new UserBlogLikeServiceImpl();
	userBlogCollectService: UserBlogCollectServiceImpl =
		new UserBlogCollectServiceImpl();

	// 添加博客
	async createBlog(
		blogObject: BlogObject,
		tagIdList: number[],
		userId: number
	) {
		let user = await User.findOne({ where: { id: userId } });
		let blog = await Blog.create(blogObject as Blog);
		if (user) {
			user.$add('blogs', blog);
		} else {
			return false;
		}
		// 添加博客对应的标签
		await blog.$add('tags', tagIdList);
		return true;
	}

	async updateBlog(blog: Partial<Blog>) {
		let res = true;
		await Blog.update(blog, { where: { id: blog.id } });
		if (blog.tags) {
			const blog1 = await Blog.findOne({ where: { id: blog.id } });
			res = await this.blogTagService.deleteBlogTagByBlogId(blog.id);
			blog1?.$add('tags', blog.tags as any);
		}
		return res ? true : false;
	}

	// 删除博客 TO DO
	async deleteBlog(id: number) {
		const blog = await this.getBlogInfo(id);
		let tagIdList: number[] = [];
		// 废弃，暂时没有更好的方法
		// blog?.tags.forEach((item) => {
		// 	tagIdList.push(item.id);
		// });
		// const tagInstances = await Tag.findAll({ where: { id: tagIdList } });
		// await blog?.$removeAssociation('tags', tagIdList);
		// 删除中间表对应数据
		const res1 = await this.blogTagService.deleteBlogTagByBlogId(id);
		if (res1) {
			const res = await Blog.destroy({ where: { id } });
			return res > 0 ? true : false;
		}
	}

	//获取文章列表
	async getBlogList(
		pageNum: number = 1,
		pageSize: number = 10,
		wrapper: BlogFind
	) {
		const offset = (pageNum - 1) * pageSize;
		let option: any = {
			offset: offset,
			limit: pageSize * 1,
			order: [
				['top', 'DESC'],
				['createdAt', 'DESC']
			],
			attributes: [
				'id',
				'title',
				'author',
				'classify',
				'blog_image',
				'blog_read',
				'blog_like',
				'content_html',
				'blog_collect',
				'top',
				'visible',
				'createdAt',
				'updatedAt'
			],
			include: [
				{
					model: Tag,
					as: 'tags',
					attributes: ['id', 'tag_name', 'tag_classify']
				}
			],
			// 去除重复
			distinct: true,
			through: { attributes: [] }
		};

		// 如果有标签id数组
		if (wrapper.tags && wrapper.tags.length > 0) {
			option.include[0].where = {
				id: {
					[Op.in]: wrapper.tags
				}
			};
		}

		// 时间升序降序，默认降序
		if (wrapper.order) option.order[1][1] = wrapper.order;
		// 按热度排序
		if (wrapper.orderByRead) option.order[1] = ['blog_read', 'DESC'];

		const filter: any = [];
		if (wrapper.user_id)
			filter.push({
				user_id: wrapper.user_id
			});
		if (wrapper.author)
			filter.push({
				author: {
					[Op.like]: `%${wrapper?.author}%`
				}
			});
		if (typeof wrapper.visible === 'number')
			filter.push({
				visible: wrapper.visible
			});
		if (wrapper.title)
			filter.push({
				title: {
					[Op.like]: `%${wrapper?.title}%`
				}
			});
		if (wrapper.content_text)
			filter.push({
				content_text: {
					[Op.like]: `%${wrapper?.content_text}%`
				}
			});
		if (wrapper.classify)
			filter.push({
				classify: {
					[Op.like]: `%${wrapper?.classify}%`
				}
			});
		if (wrapper.querySearch) {
			filter.push({
				[Op.or]: {
					title: {
						[Op.like]: `%${wrapper?.querySearch}%`
					},
					author: {
						[Op.like]: `%${wrapper?.querySearch}%`
					},
					content_text: {
						[Op.like]: `%${wrapper?.querySearch}%`
					}
				}
			});
		}
		// 传了限制条件
		if (filter.length !== 0) {
			option.where = filter;
		}
		const { count, rows } = await Blog.findAndCountAll(option);

		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	//获取文章详情
	async getBlogInfo(id: string | number) {
		const wrapper = { id };
		const res = await Blog.findOne({
			attributes: [
				'id',
				'author',
				'title',
				'classify',
				'blog_image',
				'content_text',
				'content_html',
				'blog_read',
				'blog_like',
				'blog_collect',
				'createdAt',
				'updatedAt'
			],
			where: wrapper,
			include: [
				{
					model: Tag,
					attributes: ['id', 'tag_name', 'tag_classify']
				},
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'is_admin']
				}
			]
		});
		return res ? res.dataValues : null;
	}

	// 添加博客对应的文章标签
	async createBlog_tag(id: number, tags: number[]): Promise<boolean> {
		let addArr: Blog_tagType[] = [];
		tags.forEach((item) => {
			addArr.push({
				blog_id: id,
				tag_id: item
			});
		});
		const res = await Blog_Tag.bulkCreate(addArr as Blog_Tag[]);
		return res ? true : false;
	}

	// 获取博客对应标签
	async getBlog_tag(id: number): Promise<Blog_Tag[] | null> {
		const wrapper = { blog_id: id };
		const res = await Blog_Tag.findAll({ where: wrapper });
		return res ? res : null;
	}

	// 获取标签对应博客列表
	async getBlogListByTag(
		tags: number[],
		pageNum: number = 1,
		pageSize: number = 10
	) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Blog.findAndCountAll({
			attributes: [
				'id',
				'title',
				'createdAt',
				[sequelize.fn('date', sequelize.col('Blog.createdAt')), 'date'],
				[sequelize.fn('year', sequelize.col('Blog.createdAt')), 'year']
			],
			include: [
				{
					model: Tag,
					as: 'tags',
					attributes: ['id', 'tag_name', 'tag_classify'],
					where: {
						id: {
							[Op.in]: tags
						}
					}
				}
			],
			order: [['createdAt', 'DESC']],
			offset: offset,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows: rows
		};
	}

	//增加文章阅读量
	async addRead(id: number) {
		const blog = await Blog.findByPk(id);
		const res = await Blog.update(
			{ blog_read: blog?.dataValues.blog_read! + 1 },
			{ where: { id } }
		);
		return res[0] > 0 ? true : false;
	}

	//点赞文章
	async likeArticle(id: number, user: User) {
		const blog = await Blog.findByPk(id);
		const res = await Blog.update(
			{ blog_like: blog?.dataValues.blog_like! + 1 },
			{ where: { id } }
		);
		if (res[0] > 0) {
			await blog?.$add('likedUsers', user.id);
			return true;
		} else {
			return false;
		}
	}

	// 取消点赞
	async unlikeArticle(id: number, user: User) {
		const blog = await Blog.findByPk(id);
		const res = await Blog.update(
			{ blog_like: blog?.dataValues.blog_like! - 1 },
			{ where: { id } }
		);
		if (res[0] > 0) {
			await this.userBlogLikeService.deleteUserBlogLikeById(id, user.id);
			return true;
		} else {
			return false;
		}
	}

	// 获取点赞的文章列表
	async getLikeList(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await User.findAndCountAll({
			where: {
				id
			},
			include: [
				{
					model: Blog,
					as: 'likedBlogs',
					attributes: [
						'id',
						'author',
						'title',
						'classify',
						'blog_image',
						'blog_read',
						'blog_like',
						'blog_collect',
						'createdAt',
						'updatedAt'
					],
					include: [
						{
							model: Tag,
							attributes: ['id', 'tag_name', 'tag_classify']
						}
					]
				}
			],
			offset: offset,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows: rows[0].dataValues.likedBlogs
		};
	}

	// 获取某一文章点赞用户列表
	async getLikeUserList(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Blog.findAndCountAll({
			where: {
				id
			},
			include: [
				{
					model: User,
					as: 'likedUsers',
					attributes: [
						'id',
						'is_admin',
						'name',
						'user_image',
						'description',
						'user_focus',
						'user_fans'
					]
				}
			],
			offset: offset,
			limit: pageSize
		});
		return {
			total: count,
			rows
		};
	}

	//收藏文章
	async collectArticle(id: number, user: User) {
		const blog = await Blog.findByPk(id);
		const res = await Blog.update(
			{ blog_collect: blog?.dataValues.blog_collect! + 1 },
			{ where: { id } }
		);
		if (res[0] > 0) {
			await blog?.$add('collectedUsers', user.id);
			return true;
		} else {
			return false;
		}
	}

	// 取消收藏
	async uncollectArticle(id: number, user: User) {
		const blog = await Blog.findByPk(id);
		const res = await Blog.update(
			{ blog_collect: blog?.dataValues.blog_collect! - 1 },
			{ where: { id } }
		);
		if (res[0] > 0) {
			await this.userBlogCollectService.deleteUserBlogCollectById(
				id,
				user.id
			);
			return true;
		} else {
			return false;
		}
	}

	// 获取收藏的文章列表
	async getCollectList(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await User.findAndCountAll({
			where: {
				id
			},
			include: [
				{
					model: Blog,
					as: 'collectedBlogs',
					attributes: [
						'id',
						'author',
						'title',
						'classify',
						'blog_image',
						'blog_read',
						'blog_like',
						'blog_collect',
						'createdAt',
						'updatedAt'
					],
					include: [
						{
							model: Tag,
							attributes: ['id', 'tag_name', 'tag_classify']
						}
					]
				}
			],
			offset: offset,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows: rows[0].dataValues.collectedBlogs
		};
	}

	// 获取某一文章收藏用户列表
	async getCollectUserList(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Blog.findAndCountAll({
			where: {
				id
			},
			include: [
				{
					model: User,
					as: 'collectedUsers',
					attributes: [
						'id',
						'is_admin',
						'name',
						'user_image',
						'description',
						'user_focus',
						'user_fans'
					]
				}
			],
			offset: offset,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	// 是否点赞
	async getIsLikeStatus(blog_id: number, user_id: number) {
		const res = await User_Blog_Like.findOne({
			where: {
				blog_id,
				user_id
			}
		});
		if (res) {
			return {
				status: true
			};
		} else {
			return {
				status: false
			};
		}
	}

	// 是否收藏
	async getIsCollectStatus(blog_id: number, user_id: number) {
		const res = await User_Blog_Collect.findOne({
			where: {
				blog_id,
				user_id
			}
		});
		if (res) {
			return {
				status: true
			};
		} else {
			return {
				status: false
			};
		}
	}

	// 获取某一用户博客列表
	async getBlogListByUserId(id: number) {
		// TO DO
		const wrapper = {};
	}

	// 获取推荐文章
	async getRecommendBlog(id: number) {
		const blog = await Blog.findOne({
			where: {
				id
			},
			include: [
				{
					model: Tag,
					as: 'tags',
					attributes: ['id', 'tag_name', 'tag_classify']
				}
			]
		});
		if (blog) {
			const tagIdList: number[] = [];
			blog.dataValues.tags.forEach((item) => {
				tagIdList.push(item.id);
			});
			const res = await this.getBlogListByTag(tagIdList, 1, 6);
			// 剔除自己
			const newRows = res.rows.filter((item) => {
				if (item.dataValues.id === id) {
					return false;
				}
				return true;
			});
			return {
				...res,
				rows: newRows
			};
		} else {
			return false;
		}
	}

	async getHotBlogList(pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		let option: any = {
			offset: offset,
			limit: pageSize * 1,
			order: [['blog_read', 'DESC']],
			attributes: [
				'id',
				'title',
				'blog_image',
				'blog_read',
				'blog_like',
				'createdAt',
				'updatedAt'
			],
			// 去除重复
			distinct: true
		};
		const { rows } = await Blog.findAndCountAll(option);
		return rows;
	}

	async getBlogCount() {
		const count = await Blog.count();
		return count;
	}

	async getSubfield() {
		const res = await Blog.findAll({
			where: {
				classify: {
					[Op.in]: [0, 1, 2, 3, 4]
				}
			},
			attributes: [
				'classify',
				[sequelize.fn('count', sequelize.col('classify')), 'count']
			],
			group: ['classify']
		});
		return res;
	}

	async getListBySubfield(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Blog.findAndCountAll({
			offset: offset,
			limit: pageSize * 1,
			where: {
				classify: id
			},
			attributes: [
				'id',
				'title',
				'author',
				'classify',
				'blog_image',
				'blog_read',
				'blog_like',
				'content_html',
				'blog_collect',
				'top',
				'createdAt',
				'updatedAt'
			],
			include: [
				{
					model: Tag,
					as: 'tags',
					attributes: ['id', 'tag_name', 'tag_classify']
				}
			]
		});

		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	async search(query: string) {
		const res = await Blog.findAll({
			attributes: ['id', 'title'],
			where: {
				[Op.or]: {
					title: {
						[Op.like]: `%${query}%`
					},
					author: {
						[Op.like]: `%${query}%`
					},
					content_text: {
						[Op.like]: `%${query}%`
					}
				}
			}
		});
		return res;
	}
}

export default BlogServiceImpl;
