import Album from '../model/Album';
import { PageType } from '../types';

interface AlbumService {
	// 添加相册
	addAlbum(album: Album): Promise<Album>;

	// 修改相册
	modifyAlbum(id: number, album: Album): Promise<boolean>;

	// 获取相册
	getDetail(id: number): Promise<Album | null>;

	// 获取相册列表
	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Album>
	): Promise<PageType<Album>>;

	// 删除相册
	deleteWork(id: number): Promise<boolean>;
}

export default AlbumService;
