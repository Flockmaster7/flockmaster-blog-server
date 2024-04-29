import {
	Table,
	Column,
	Model,
	DataType,
	DeletedAt
} from 'sequelize-typescript';

@Table({ tableName: 'message' })
export default class Message extends Model<Message> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: '消息内容'
	})
	content: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;
}
