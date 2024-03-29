import Router from 'koa-router';
import { validatorId, validatorPage } from '../middleware/validator';
import CircleFriendController from '../controller/CircleFriendController';
import { auth } from '../middleware/auth';

const router = new Router({ prefix: '/api/circleFriend' });

const circleFriendController = new CircleFriendController();

router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	circleFriendController.getCircleFriendList
);

router.get(
	'/getDetail/:id',
	auth,
	validatorId,
	circleFriendController.getCircleFriendDetail
);

router.post('/add', auth, circleFriendController.postCircleFriend);

router.post('/update', auth, circleFriendController.updateCircleFriend);

router.delete(
	'/remove/:id',
	auth,
	validatorId,
	circleFriendController.deleteCircleFriend
);

router.get(
	'/getUserDianzanIdList',
	auth,
	circleFriendController.getDianzanList
);

router.post(
	'/dianzan/:id',
	auth,
	validatorId,
	circleFriendController.dianzanCircleFriend
);

router.post(
	'/cancelDianzan/:id',
	auth,
	validatorId,
	circleFriendController.cancelDianzanCircleFriend
);

router.post(
	'/top/:id',
	auth,
	validatorId,
	circleFriendController.topCircleFriend
);

router.post(
	'/cancelTop/:id',
	auth,
	validatorId,
	circleFriendController.cancelTopCircleFriend
);

router.post('/comment/add', auth, circleFriendController.postComment);

router.post('/comment/update', auth, circleFriendController.updateComment);

router.delete(
	'/comment/remove/:id',
	auth,
	circleFriendController.removeComment
);

router.post(
	'/comment/getListByCirFriId',
	circleFriendController.getCommentListByCircleFriendId
);

module.exports = router;
