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

@Table({ tableName: 'circle_friend_video' })
class CircleFriendVideo extends Model<CircleFriendVideo> {
	@ForeignKey(() => CircleFriend)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '朋友圈id',
		field: 'circle_friend_id'
	})
	circleFriendId: number;

	@Column({
		type: DataType.CHAR(64),
		allowNull: true,
		comment: '视频url',
		field: 'video_url'
	})
	videoUrl: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@BelongsTo(() => CircleFriend, 'circleFriendId')
	circleFriend: CircleFriend;
}

export default CircleFriendVideo;
