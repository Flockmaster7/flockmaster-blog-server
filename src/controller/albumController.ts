import { Context } from 'koa';
import AlbumService from '../service/albumService';
import ERROR from '../utils/Error';
import Result from '../utils/Result';
import { uploadFile } from '../utils/Cos';
import Album from '../model/Album';

const albumService = new AlbumService();

class AlbumController {
	// 添加相册
	async createAlbum(ctx: Context) {
		try {
			const { album_name, album_cover } = ctx.request.body;
			const album = new Album();
			album.setAlbumCover(album_cover);
			album.setAlbumName(album_name);
			const data = await albumService.addAlbum(album);
			ctx.body = new Result(200, '添加相册成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.createAlbumError, ctx, error);
		}
	}

	// 修改相册
	async updateAlbum(ctx: Context) {
		try {
			const { id, album_name, album_cover } = ctx.request.body;
			const album = new Album();
			album_cover && album.setAlbumCover(album_cover);
			album_name && album.setAlbumName(album_name);
			const res = await albumService.modifyAlbum(id * 1, album);
			if (res) {
				ctx.body = new Result(200, '修改相册成功', 'success');
			} else {
				ctx.body = new Result(30002, '修改相册失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateAlbumError, ctx, error);
		}
	}

	// 获取相册列表
	async getAlbumList(ctx: Context) {
		try {
			const { pageSize, pageNum } = ctx.params;
			const data = await albumService.getList(pageNum * 1, pageSize * 1);
			ctx.body = new Result(200, '获取相册列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getWorkListError, ctx, error);
		}
	}

	// 删除相册
	async removeAlbum(ctx: Context) {
		try {
			const { id } = ctx.params;
			const res = await albumService.deleteWork(id * 1);
			if (res) {
				ctx.body = new Result(200, '删除相册成功', 'success');
			} else {
				ctx.body = new Result(30007, '删除相册失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeAlbumError, ctx, error);
		}
	}

	// 上传相册封面
	async uploadCover(ctx: Context) {
		try {
			const cover = ctx.state.img;
			const res = {
				work_image: `/flockmaster-blogs/album/${cover.newFilename}`
			};
			// 上传到腾讯云cos
			await uploadFile(cover.filepath, cover.newFilename, 'album');
			ctx.body = new Result(200, '上传相册封面成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.uploadError, ctx, error);
		}
	}
}

export default AlbumController;
