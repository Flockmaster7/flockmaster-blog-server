import Router from 'koa-router';
import { auth } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/validator';
import PermissionController from '../controller/PermissionController';

const router = new Router({ prefix: '/api/permission' });

const permissionController = new PermissionController();

router.post('/create', auth, permissionController.createPermission);

router.post('/update', auth, permissionController.updatePermission);

router.get(
	'/getDetail/:id?',
	validatorId,
	permissionController.getPermissionDetail
);

router.get(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	permissionController.getPermissionList
);

router.delete(
	'/delete/:id?',
	auth,
	validatorId,
	permissionController.removePermission
);

module.exports = router;
