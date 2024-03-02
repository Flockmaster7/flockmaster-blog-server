import Router from 'koa-router';
import { auth } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/validator';
import RoleController from '../controller/RoleController';

const router = new Router({ prefix: '/api/role' });

const roleController = new RoleController();

router.post('/create', auth, roleController.createRole);

router.post('/update', auth, roleController.updateRole);

router.get('/getDetail/:id?', validatorId, roleController.getRoleDetail);

router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	roleController.getRoleList
);

router.delete('/delete/:id?', auth, validatorId, roleController.removeRole);

module.exports = router;
