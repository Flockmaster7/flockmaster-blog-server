import Router from 'koa-router';
import UserController from '../controller/userController';
import {
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	verifyLogin,
	userIsExist,
	userIsExistById
} from '../middleware/userMiddleware';
import { auth, isAdmin } from '../middleware/auth';
import {
	validatorId,
	validatorPage,
	verifyUploadImg
} from '../middleware/validator';

const router = new Router({ prefix: '/api/users' });

const userController = new UserController();

// 用户登录
router.post(
	'/login',
	loginOrRegisterFormValidator,
	verifyLogin,
	userController.login
);

// 用户注册
router.post(
	'/register',
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	userController.register
);

// 修改密码
router.post(
	'/updatepwd',
	loginOrRegisterFormValidator,
	userIsExist,
	cryptPassword,
	userController.updatePassword
);

// 获取用户信息
router.get('/getUserInfo', auth, userController.getUserInfo);

// 更新用户信息
router.post('/updateUserInfo', auth, userController.updateUserInfo);

//上传用户头像
router.post(
	'/uploadAvatar',
	auth,
	verifyUploadImg,
	userController.uploadAvatar
);

// 删除用户
router.delete(
	'/delete/:id?',
	auth,
	isAdmin,
	validatorId,
	userIsExistById,
	userController.removeUser
);

// 关注用户
router.post('/follow/:id?', auth, validatorId, userController.follow);

// 取消关注用户
router.post('/unfollow/:id?', auth, validatorId, userController.unfollow);

// 获取关注列表
router.get(
	'/getUserFollow/:pageNum?/:pageSize?',
	auth,
	validatorPage,
	userController.getUserFollowList
);

// 获取粉丝列表
router.get(
	'/getUserFans/:pageNum?/:pageSize?',
	auth,
	validatorPage,
	userController.getUserFansList
);

// 获取关注列表
router.get('/isFollow/:id?', auth, validatorId, userController.isFollowUser);

// 获取管理员个人信息
router.get('/admin', userController.getAdminInfo);

// 获取用户列表
router.get('/getUserList', auth, userController.getUserList);

module.exports = router;
