import Router from 'koa-router';
import { auth, authPermission } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/validator';
import MessageController from '../controller/MessageController';

const router = new Router({ prefix: '/api/message' });

const messageController = new MessageController();

router.post('/create', auth, authPermission, messageController.createMessage);

router.post('/update', auth, authPermission, messageController.updateMessage);

router.get('/getDetail/:id?', validatorId, messageController.getMessageDetail);

router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	messageController.getMessageList
);

router.delete(
	'/delete/:id?',
	auth,
	authPermission,
	validatorId,
	messageController.removeMessage
);

module.exports = router;
