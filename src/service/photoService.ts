import { Op } from 'sequelize';
import Photo from '../model/Photo';
import Work from '../model/Work';
import { WorkType } from '../types/work';
import AlbumService from './albumService';
import { Sequelize } from 'sequelize-typescript';

const albumService = new AlbumService();

class PhotoService {
	// 添加相册图片
	async addPhoto(id: number, photo: Photo[]): Promise<boolean> {
		const photoList = await Photo.bulkCreate(photo);
		const album = await albumService.getDetail(id);
		if (album) {
			await album?.$add('photo', photoList);
			return true;
		} else {
			return false;
		}
	}

	// 修改相册图片
	async modifyPhoto(id: number, photo: Photo): Promise<boolean> {
		const wrapper = { id };
		const res = await Photo.update(photo, { where: wrapper });
		return res[0] > 0 ? true : false;
	}

	// 获取相册图片
	async getList(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Photo.findAndCountAll({
			where: {
				album_id: id
			},
			attributes: ['id', 'album_id', 'photo_url', 'createdAt'],
			offset,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	// 删除相册图片
	async deletePhoto(photo_id: number[]): Promise<boolean> {
		const res = await Photo.destroy({
			where: {
				id: {
					[Op.in]: photo_id
				}
			}
		});
		return res > 0 ? true : false;
	}

	// 获取所有图片
	async getAllPhoto(pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Photo.findAndCountAll({
			attributes: [
				'photo_url',
				[Sequelize.fn('date', Sequelize.col('createdAt')), 'date']
			],
			offset,
			limit: pageSize,
			group: [Sequelize.fn('date', Sequelize.col('createdAt'))]
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}
}

export default PhotoService;
