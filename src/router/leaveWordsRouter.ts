import Router from 'koa-router';
import { auth, authPermission } from '../middleware/auth';
import LeaveWordsController from '../controller/LeaveWordsController';
import { validatorId, validatorPage } from '../middleware/validator';

const router = new Router({ prefix: '/api' });
const leaveWordsController = new LeaveWordsController();

// 文章留言
router.post(
	'/leaveWord',
	auth,
	authPermission,
	leaveWordsController.addLeaveWord
);

// 修改留言
router.post(
	'/leaveWord/update/:id',
	auth,
	authPermission,
	validatorId,
	leaveWordsController.updateLeaveWord
);

// 删除留言
router.delete(
	'/leaveWord/:id',
	auth,
	authPermission,
	validatorId,
	leaveWordsController.removeLeaveWord
);

// 查询留言列表
router.post(
	'/getLeaveWordList/:pageNum/:pageSize',
	validatorPage,
	leaveWordsController.getLeaveWordList
);

// 查询子留言列表
router.get(
	'/getChildrenLeaveWordList/:id/:pageNum/:pageSize',
	validatorId,
	leaveWordsController.getChildrenLeaveWordList
);

router.post(
	'/leaveWord/dianzan/:id',
	auth,
	validatorId,
	leaveWordsController.dianzanLeavewords
);

router.post(
	'/leaveWord/cancelDianzan/:id',
	auth,
	validatorId,
	leaveWordsController.cancelDianzanLeavewords
);

module.exports = router;
