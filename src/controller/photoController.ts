import { Context } from 'koa';
import ERROR from '../utils/Error';
import Result from '../utils/Result';
import PhotoService from '../service/photoService';
import { uploadFile } from '../utils/Cos';
import Photo from '../model/Photo';

const photoService = new PhotoService();

class PhotoController {
	// 添加相册图片
	async createPhoto(ctx: Context) {
		try {
			const id = ctx.params.id;
			const { photo } = ctx.request.body;
			const photoList: Photo[] = [];
			photo.forEach((item: any) => {
				const photoItem = new Photo();
				photoItem.setAlbumId(id);
				photoItem.setPhotoUrl(item.photo_url);
				photoList.push(photoItem);
			});
			const data = await photoService.addPhoto(id * 1, photoList);
			if (data) {
				ctx.body = new Result(200, '添加相册图片成功', 'success');
			} else {
				ctx.body = new Result(404, '相册不存在', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.createPhotoError, ctx, error);
		}
	}

	// 修改相册图片
	async updatePhoto(ctx: Context) {
		try {
			const { id, photo_url } = ctx.request.body;
			const photo = new Photo();
			photo.setPhotoUrl(photo_url);
			const res = await photoService.modifyPhoto(id, photo);
			if (res) {
				ctx.body = new Result(200, '修改相册图片成功', 'success');
			} else {
				ctx.body = new Result(60006, '修改相册图片失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updatePhotoError, ctx, error);
		}
	}

	// 获取相册图片
	async getPhotoList(ctx: Context) {
		try {
			const { id, pageSize, pageNum } = ctx.params;
			const data = await photoService.getList(
				id * 1,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取相册图片成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getPhotoListError, ctx, error);
		}
	}

	// 删除相册图片
	async removePhoto(ctx: Context) {
		try {
			const { photo_id } = ctx.request.body;
			console.log(photo_id);
			const res = await photoService.deletePhoto(photo_id);
			if (res) {
				ctx.body = new Result(200, '删除相册图片成功', 'success');
			} else {
				ctx.body = new Result(30007, '删除相册图片失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removePhotoError, ctx, error);
		}
	}

	// 上传相册图片
	async uploadPhoto(ctx: Context) {
		try {
			const imgList = ctx.state.imgList;
			const res: { photo: string }[] = [];
			imgList.forEach(async (photo: any) => {
				res.push({
					photo: `/flockmaster-blogs/photo/${photo.newFilename}`
				});
				// 上传图片到腾讯云
				await uploadFile(photo.filepath, photo.newFilename, 'photo');
			});
			ctx.body = new Result(200, '上传相册图片成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.uploadError, ctx, error);
		}
	}

	// 获取所有图片
	async getAllPhotoList(ctx: Context) {
		try {
			const { pageSize, pageNum } = ctx.params;
			const data = await photoService.getAllPhoto(
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取相册图片成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getAllPhotoListError, ctx, error);
		}
	}
}

export default PhotoController;
