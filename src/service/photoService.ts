import { Op } from 'sequelize';
import Photo from '../model/Photo';
import Work from '../model/Work';
import { WorkType } from '../types/work';
import { Sequelize } from 'sequelize-typescript';
import AlbumServiceImpl from './Implement/AlbumServiceImpl';
import { PageType } from '../types';

const albumService = new AlbumServiceImpl();

interface PhotoService {
	// 添加相册图片
	addPhoto(id: number, photo: Photo[]): Promise<boolean>;

	// 修改相册图片
	modifyPhoto(id: number, photo: Photo): Promise<boolean>;

	// 获取相册图片
	getList(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<PageType<Photo>>;

	// 删除相册图片
	deletePhoto(photo_id: number[]): Promise<boolean>;

	// 获取所有图片
	getAllPhoto(pageNum: number, pageSize: number): any;
}

export default PhotoService;
