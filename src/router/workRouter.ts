import Router from 'koa-router';
import WorkController from '../controller/WorkController';
import { auth, authPermission } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/workMiddleware';
import { verifyUploadImg } from '../middleware/validator';

const router = new Router({ prefix: '/api/work' });

const workController = new WorkController();

// 添加作品
router.post('/create', auth, authPermission, workController.createWork);

// 更新作品
router.post('/update', auth, authPermission, workController.updateWork);

// 获取作品详情
router.get('/getDetail/:id?', validatorId, workController.getWorkDetail);

// 获取作品列表
router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	workController.getWorkList
);

// 删除作品
router.delete(
	'/delete/:id?',
	auth,
	authPermission,
	validatorId,
	workController.removeWork
);

// 上传作品背景图片
router.post(
	'/uploadBgImg',
	auth,
	authPermission,
	verifyUploadImg,
	workController.uploadBgImg
);

module.exports = router;
