import Router from 'koa-router';
import TagController from '../controller/TagController';
import { auth } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/validator';

const router = new Router({ prefix: '/api/blog' });

const tagController = new TagController();

router.post('/tag/create', auth, tagController.createTag);

router.post('/tag/update', auth, validatorId, tagController.updateTag);

router.delete('/tag/delete/:id', auth, validatorId, tagController.removeTag);

router.get(
	'/tag/getCurrentTagList/:id',
	validatorId,
	tagController.getCurrentTagList
);

router.post(
	'/tag/getTagList/:pageNum?/:pageSize?',
	validatorPage,
	tagController.getTagList
);

module.exports = router;
