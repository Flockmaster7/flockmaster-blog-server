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
import Message from './Message';

@Table({ tableName: 'notice' })
export default class Notice extends Model<Notice> {
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '用户id，为null表示系统通知',
		field: 'user_id'
	})
	userId: number;

	@ForeignKey(() => Message)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '消息id',
		field: 'message_id'
	})
	messageId: number;

	@Column({
		type: DataType.INTEGER,
		defaultValue: 0,
		comment: '是否已读，0表示未读，1表示已读',
		field: 'is_read'
	})
	isRead: number;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Message)
	message: Message;
}
