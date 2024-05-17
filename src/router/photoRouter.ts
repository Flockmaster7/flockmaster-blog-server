import Router from 'koa-router';
import { auth, authPermission } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/workMiddleware';
import { verifyUploadImg } from '../middleware/validator';
import PhotoController from '../controller/PhotoController';

const router = new Router({ prefix: '/api/photo' });

const photoController = new PhotoController();

// 添加相册图片
router.post(
	'/create/:id',
	auth,
	authPermission,
	validatorId,
	photoController.createPhoto
);

// 更新相册图片
router.post('/update', auth, authPermission, photoController.updatePhoto);

// 获取相册图片
router.get(
	'/getList/:id/:pageNum?/:pageSize?',
	validatorId,
	validatorPage,
	photoController.getPhotoList
);

// 删除相册图片
router.post('/delete', auth, authPermission, photoController.removePhoto);

// 上传相册图片
router.post('/uploadPhoto', auth, verifyUploadImg, photoController.uploadPhoto);

router.get(
	'/getAllPhoto/:pageNum?/:pageSize?',
	validatorPage,
	photoController.getAllPhotoList
);

module.exports = router;
