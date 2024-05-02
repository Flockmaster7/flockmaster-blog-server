import Router from 'koa-router';
import { auth } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/validator';
import NoticeController from '../controller/NoticeController';

const router = new Router({ prefix: '/api/notice' });

const noticeController = new NoticeController();

router.post('/create', auth, noticeController.createNotice);

router.post('/update', auth, noticeController.updateNotice);

router.get('/getDetail/:id?', validatorId, noticeController.getNoticeDetail);

router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	noticeController.getNoticeList
);

router.delete('/delete/:id?', auth, validatorId, noticeController.removeNotice);

router.post('/noReadNum', auth, noticeController.getNoRead);

module.exports = router;
