import Router from 'koa-router';
import { validatorId, validatorPage } from '../middleware/validator';
import CircleFriendController from '../controller/CircleFriendController';
import { auth, authPermission } from '../middleware/auth';

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

router.post(
	'/add',
	auth,
	authPermission,
	circleFriendController.postCircleFriend
);

router.post(
	'/update',
	auth,
	authPermission,
	circleFriendController.updateCircleFriend
);

router.delete(
	'/remove/:id',
	auth,
	authPermission,
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
	authPermission,
	validatorId,
	circleFriendController.topCircleFriend
);

router.post(
	'/cancelTop/:id',
	auth,
	authPermission,
	validatorId,
	circleFriendController.cancelTopCircleFriend
);

router.post('/comment/add', auth, circleFriendController.postComment);

router.post(
	'/comment/update',
	auth,
	authPermission,
	circleFriendController.updateComment
);

router.delete(
	'/comment/remove/:id',
	auth,
	authPermission,
	circleFriendController.removeComment
);

router.post(
	'/comment/getListByCirFriId',
	circleFriendController.getCommentListByCircleFriendId
);

module.exports = router;
