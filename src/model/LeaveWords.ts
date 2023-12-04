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

@Table({ tableName: 'leavewords' })
export default class LeaveWords extends Model<LeaveWords> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: '留言内容'
	})
	content: string;

	@ForeignKey(() => LeaveWords)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '回复的id，为null表示评论文章'
	})
	parent_id: number | null;

	@ForeignKey(() => LeaveWords)
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

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	// 回复的目标评论
	@BelongsTo(() => LeaveWords, { foreignKey: 'reply_to' })
	targetLeaveWords: LeaveWords;

	@HasMany(() => LeaveWords, { foreignKey: 'parent_id', onDelete: 'CASCADE' })
	children: LeaveWords[];

	@BelongsTo(() => LeaveWords, {
		foreignKey: 'parent_id',
		onDelete: 'CASCADE'
	})
	parent: LeaveWords;

	@BelongsTo(() => User, { foreignKey: 'user_id' })
	user: User;
}
