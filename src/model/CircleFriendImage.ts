import {
	BelongsTo,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import CircleFriend from './CircleFriend';

@Table({ tableName: 'circle_friend_image' })
class CircleFriendImage extends Model<CircleFriendImage> {
	@ForeignKey(() => CircleFriend)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '朋友圈id',
		field: 'circle_friend_id'
	})
	circleFriendId: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '图片url',
		field: 'image_url'
	})
	imageUrl: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@BelongsTo(() => CircleFriend, 'circleFriendId')
	circleFriend: CircleFriend;
}

export default CircleFriendImage;
