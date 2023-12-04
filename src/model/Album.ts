import {
	Column,
	DataType,
	DeletedAt,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import Photo from './Photo';

@Table({ tableName: 'album' })
export default class Album extends Model<Album> {
	@Column({
		type: DataType.CHAR(64),
		allowNull: true,
		comment: '相册名称'
	})
	private album_name: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '相册封面'
	})
	private album_cover: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@HasMany(() => Photo)
	photo: Photo[];

	public getAlbumName() {
		return this.album_name;
	}

	public setAlbumName(album_name: string) {
		this.album_name = album_name;
	}

	public getAlbumCover(): string {
		return this.album_cover;
	}

	public setAlbumCover(album_cover: string): void {
		this.album_cover = album_cover;
	}
}
