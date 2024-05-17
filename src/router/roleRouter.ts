import Router from 'koa-router';
import { auth, authPermission } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/validator';
import RoleController from '../controller/RoleController';

const router = new Router({ prefix: '/api/role' });

const roleController = new RoleController();

router.post('/create', auth, authPermission, roleController.createRole);

router.post('/update', auth, authPermission, roleController.updateRole);

router.get('/getDetail/:id?', validatorId, roleController.getRoleDetail);

router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	roleController.getRoleList
);

router.delete(
	'/delete/:id?',
	auth,
	authPermission,
	validatorId,
	roleController.removeRole
);

module.exports = router;
