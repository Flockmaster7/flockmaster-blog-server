import Router from 'koa-router';
import { auth, authPermission } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/workMiddleware';
import { verifyUploadImg } from '../middleware/validator';
import AlbumController from '../controller/AlbumController';

const router = new Router({ prefix: '/api/album' });

const albumController = new AlbumController();

// 添加相册
router.post('/create', auth, authPermission, albumController.createAlbum);

// 更新相册
router.post('/update', auth, authPermission, albumController.updateAlbum);

// 获取相册列表
router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	albumController.getAlbumList
);

// 删除相册
router.delete(
	'/delete/:id?',
	auth,
	authPermission,
	validatorId,
	albumController.removeAlbum
);

// 上传相册封面
router.post('/uploadCover', auth, verifyUploadImg, albumController.uploadCover);

module.exports = router;
