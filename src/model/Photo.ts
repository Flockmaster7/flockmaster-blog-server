import {
	BelongsTo,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import Album from './Album';

@Table({ tableName: 'photo' })
export default class Photo extends Model<Photo> {
	@ForeignKey(() => Album)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '相册id'
	})
	album_id: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '照片路径'
	})
	private photo_url: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@BelongsTo(() => Album)
	album: Album;

	public getAlbumId() {
		return this.album_id;
	}

	public setAlbumId(album_id: number) {
		this.album_id = album_id;
	}

	public getPhotoUrl() {
		return this.photo_url;
	}

	public setPhotoUrl(photo_url: string) {
		this.photo_url = photo_url;
	}
}
