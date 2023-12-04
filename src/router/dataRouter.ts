import Router from 'koa-router';
import { auth } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/workMiddleware';
import { verifyUploadImg } from '../middleware/validator';
import DataController from '../controller/dataController';

const router = new Router({ prefix: '/api/data' });

const dataController = new DataController();

// 获取今日访问量
router.get('/dailyNum', dataController.dailyNum);

// 获取分类文章比例
router.get('/blogClassifiy', dataController.blogClassifiy);

// 获取各模块数量
router.get('/moduleNum', dataController.moduleNum);

// 获取热门文章排行
router.get('/hotBlog', dataController.hotBlog);

// // 更新相册
// router.post('/update', auth, validatorId, albumController.updateAlbum);

// // 获取相册列表
// router.get(
// 	'/getList/:pageNum?/:pageSize?',
// 	validatorPage,
// 	albumController.getAlbumList
// );

// // 删除相册
// router.delete('/delete/:id?', auth, validatorId, albumController.removeAlbum);

// // 上传相册封面
// router.post('/uploadCover', auth, verifyUploadImg, albumController.uploadCover);

module.exports = router;
