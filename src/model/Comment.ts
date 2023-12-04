import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	DataType,
	HasMany,
	DeletedAt
} from 'sequelize-typescript';
import User from './User';
import Blog from './Blog';

@Table({ tableName: 'comment' })
export default class Comment extends Model<Comment> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: '评论内容'
	})
	content: string;

	@ForeignKey(() => Comment)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '回复的id，为null表示评论文章'
	})
	parent_id: number | null;

	@ForeignKey(() => Comment)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '回复的评论id，为null表示文章评论'
	})
	reply_to: number | null;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '回复的用户id'
	})
	user_id: number;

	@ForeignKey(() => Blog)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '文章id'
	})
	blog_id: number;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	// 回复的目标评论
	@BelongsTo(() => Comment, { foreignKey: 'reply_to' })
	targetComment: Comment;

	@HasMany(() => Comment, { foreignKey: 'parent_id', onDelete: 'CASCADE' })
	children: Comment[];

	@BelongsTo(() => Comment, { foreignKey: 'parent_id', onDelete: 'CASCADE' })
	parent: Comment;

	@BelongsTo(() => User, { foreignKey: 'user_id' })
	user: User;

	@BelongsTo(() => Blog)
	blog: Blog;
}
