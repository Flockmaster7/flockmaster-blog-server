import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	DataType,
	DeletedAt
} from 'sequelize-typescript';
import User from './User';
import CircleFriend from './CircleFriend';

@Table({ tableName: 'circle_friend_comment' })
export default class CircleFriendComment extends Model<CircleFriendComment> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: '评论内容'
	})
	content: string;

	@ForeignKey(() => CircleFriendComment)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '回复的评论id，为null表示文章评论',
		field: 'reply_to'
	})
	replyTo: number | null;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '评论用户id',
		field: 'user_id'
	})
	userId: number;

	@ForeignKey(() => CircleFriend)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '朋友圈id',
		field: 'circle_friend_id'
	})
	circleFriendId: number;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	// 回复的目标评论
	@BelongsTo(() => CircleFriendComment)
	targetComment: CircleFriendComment;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => CircleFriend)
	circleFriend: CircleFriend;
}
