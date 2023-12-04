import Album from '../model/Album';
import Photo from '../model/Photo';

class AlbumService {
	// 添加相册
	async addAlbum(album: Album) {
		const res = await Album.create(album);
		return res.dataValues;
	}

	// 修改相册
	async modifyAlbum(id: number, album: Album) {
		const wrapper = { id };
		const res = await Album.update(album, { where: wrapper });
		return res[0] > 0 ? true : false;
	}

	// 获取相册
	async getDetail(id: number) {
		const wrapper = { id };
		const res = await Album.findOne({
			where: wrapper
		});
		return res ? res : null;
	}

	// 获取相册列表
	async getList(pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Album.findAndCountAll({
			offset,
			limit: pageSize,
			attributes: ['id', 'album_name', 'album_cover', 'createdAt']
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	// 删除相册
	async deleteWork(id: number) {
		const wrapper = { id };
		const res1 = await Album.destroy({ where: wrapper });
		// 通过相册id删除图片
		await Photo.destroy({
			where: {
				album_id: id
			}
		});
		return res1 > 0 ? true : false;
	}
}

export default AlbumService;
