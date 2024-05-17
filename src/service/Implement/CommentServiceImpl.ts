import CommentService from '../CommentService';
import Comment from '../../model/Comment';
import User from '../../model/User';
import sequelize from '../../db/mysql';

class CommentServiceImpl implements CommentService {
	// 发布评论
	async addComment(wrapper: any): Promise<Comment> {
		const res = await Comment.create(wrapper as Comment);
		if (wrapper.parent_id) {
			const parentComment = await Comment.findOne({
				where: {
					id: wrapper.parent_id
				}
			});
			parentComment?.$add('children', res);
		}
		return res.dataValues;
	}

	// 获取评论列表
	async getComment(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Comment.findAndCountAll({
			where: {
				blog_id: id,
				parent_id: null
			},
			attributes: {
				include: [
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM comment_dianzan WHERE comment_dianzan.comment_id = Comment.id)'
						),
						'dianzanCount'
					],
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM comment AS ChildComment WHERE ChildComment.parent_id = Comment.id)'
						),
						'childrenCount'
					]
				]
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: Comment,
					as: 'children',
					attributes: {
						include: [
							[
								sequelize.literal(
									'(SELECT COUNT(*) FROM comment_dianzan WHERE comment_dianzan.comment_id = Comment.id)'
								),
								'dianzanCount'
							]
						]
					},
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						},
						{
							model: Comment,
							as: 'targetComment',
							include: [
								{
									model: User,
									as: 'user',
									attributes: ['id', 'name', 'user_image']
								}
							]
						}
					],
					limit: 3,
					order: [['createdAt', 'DESC']]
				}
			],
			limit: pageSize * 1,
			offset: offset,
			order: [['createdAt', 'DESC']]
		});
		// 查询评论总数
		const total = await Comment.count({
			where: {
				blog_id: id
			}
		});
		return {
			pageNum,
			pageSize,
			total,
			count,
			rows: rows
		};
	}

	// 获取子评论
	async getChildComment(
		parent_id: number,
		pageNum: number,
		pageSize: number
	) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Comment.findAndCountAll({
			where: {
				parent_id: parent_id
			},
			attributes: {
				include: [
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM comment_dianzan WHERE comment_dianzan.comment_id = Comment.id)'
						),
						'dianzanCount'
					]
				]
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: Comment,
					as: 'targetComment',
					attributes: {
						include: [
							[
								sequelize.literal(
									'(SELECT COUNT(*) FROM comment_dianzan WHERE comment_dianzan.comment_id = Comment.id)'
								),
								'dianzanCount'
							]
						]
					},
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						}
					]
				}
			],
			limit: pageSize * 1,
			offset: offset,
			order: [['createdAt', 'DESC']]
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows: rows
		};
	}

	// 删除评论
	async deleteComment(id: number): Promise<boolean> {
		const res = await Comment.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	//修改评论
	async modifyComment(comment: Comment, id: number): Promise<boolean> {
		const res = await Comment.update(comment, {
			where: {
				id
			}
		});
		return res[0] > 0 ? true : false;
	}

	async getLatestComment(
		pageNum: number,
		pageSize: number
	): Promise<Comment[]> {
		const offset = (pageNum - 1) * pageSize;
		const { rows } = await Comment.findAndCountAll({
			where: {
				parent_id: null
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				}
			],
			limit: pageSize * 1,
			offset: offset,
			order: [['createdAt', 'DESC']]
		});
		return rows;
	}
}

export default CommentServiceImpl;
