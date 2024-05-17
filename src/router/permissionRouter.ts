import Router from 'koa-router';
import { auth, authPermission } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/validator';
import PermissionController from '../controller/PermissionController';

const router = new Router({ prefix: '/api/permission' });

const permissionController = new PermissionController();

router.post(
	'/create',
	auth,
	authPermission,
	permissionController.createPermission
);

router.post(
	'/update',
	auth,
	authPermission,
	permissionController.updatePermission
);

router.get(
	'/getDetail/:id?',
	validatorId,
	permissionController.getPermissionDetail
);

router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	permissionController.getPermissionList
);

router.delete(
	'/delete/:id?',
	auth,
	authPermission,
	validatorId,
	permissionController.removePermission
);

module.exports = router;
