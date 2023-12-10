import Router from 'koa-router';
import { validatorId, validatorPage } from '../middleware/validator';
import CircleFriendController from '../controller/CircleFriendController';
import { auth } from '../middleware/auth';

const router = new Router({ prefix: '/api/circleFriend' });

const circleFriendController = new CircleFriendController();

router.get(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	circleFriendController.getCircleFriendList
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

module.exports = router;