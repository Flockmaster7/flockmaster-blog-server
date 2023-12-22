import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import User from './User';
import CIrcleFriendLDianzan from './CircleFriendDianzan';
import CircleFriendImage from './CircleFriendImage';
import CircleFriendVideo from './CircleFriendVideo';

@Table({ tableName: 'circle_friend' })
class CircleFriend extends Model<CircleFriend> {
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '用户id'
	})
	user_id: number;

	@Column({
		type: DataType.CHAR(64),
		allowNull: true,
		comment: '文字'
	})
	content: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: 0,
		comment: '是否置顶'
	})
	top: number;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@BelongsTo(() => User, { foreignKey: 'user_id' })
	user: User;

	@BelongsToMany(() => User, () => CIrcleFriendLDianzan)
	dianzanUsers: User[];

	@HasMany(() => CircleFriendImage)
	images: CircleFriendImage[];

	@HasMany(() => CircleFriendVideo)
	videos: CircleFriendVideo[];
}

export default CircleFriend;
