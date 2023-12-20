import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import User from './User';
import Comment from './Comment';

@Table({ tableName: 'comment_dianzan' })
class CommentDianzan extends Model<CommentDianzan> {
	@ForeignKey(() => Comment)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '评论id',
		field: 'comment_id'
	})
	commentId: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '用户id',
		field: 'user_id'
	})
	userId: number;
}

export default CommentDianzan;
