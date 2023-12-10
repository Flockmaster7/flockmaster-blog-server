import {
	BelongsTo,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import CircleFriend from './CircleFriend';
import User from './User';

@Table({ tableName: 'circle_friend_dianzan' })
class CircleFriendDianzan extends Model<CircleFriendDianzan> {
	@ForeignKey(() => CircleFriend)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '朋友圈id',
		field: 'circle_friend_id'
	})
	circleFriendId: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '用户id',
		field: 'user_id'
	})
	userId: number;
}

export default CircleFriendDianzan;
