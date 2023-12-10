import Router from 'koa-router';
import { auth } from '../middleware/auth';
import BlogController from '../controller/BlogController';
import {
	validatorBlogForm,
	markdownRender,
	verifyUpload,
	verifyUploadImg
} from '../middleware/blogMiddleware';
import { validatorId, validatorPage } from '../middleware/validator';
import CommentController from '../controller/CommentController';
const router = new Router({ prefix: '/api/blog' });

const blogController = new BlogController();
const commentController = new CommentController();

//上传md文件
router.post(
	'/upload',
	auth,
	verifyUpload,
	markdownRender,
	blogController.uploadBlog
);

//上传文章封面
router.post('/uploadImg', auth, verifyUploadImg, blogController.uploadBlogImg);

// 添加文章
router.post('/create', auth, validatorBlogForm, blogController.createBlog);

// 获取文章详情
router.get('/getdetail/:id', validatorId, blogController.getBlogDetail);

//获取文章列表
router.post(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	blogController.getBlogList
);

// 获取标签对应博客列表
router.post(
	'/getBlogListByTag/:pageNum?/:pageSize?',
	validatorPage,
	blogController.getBlogListByTagId
);

// 删除博客
router.delete('/delete/:id?', auth, validatorId, blogController.removeBlog);

// 文章阅读
router.post('/read/:id?', validatorId, blogController.addBlogRead);

// 文章点赞
router.post('/like/:id?', auth, validatorId, blogController.likeBlog);

// 文章取消点赞
router.post('/unlike/:id?', auth, validatorId, blogController.unlikeBlog);

// 获取点赞的文章列表
router.get(
	'/getUserLikeList/:pageNum?/:pageSize?',
	auth,
	validatorPage,
	blogController.getUserLikeList
);

// 获取某一文章点赞用户列表
router.get(
	'/getBlogLikeUserList/:pageNum?/:pageSize?/:id?',
	auth,
	validatorId,
	validatorPage,
	blogController.getBlogLikeUserList
);

// 文章收藏
router.post('/collect/:id?', auth, validatorId, blogController.collectBlog);

// 文章取消收藏
router.post('/uncollect/:id?', auth, validatorId, blogController.uncollectBlog);

// 获取收藏的文章列表
router.get(
	'/getUserCollectList/:pageNum?/:pageSize?',
	auth,
	validatorPage,
	blogController.getUserCollectList
);

// 获取某一文章收藏用户列表
router.get(
	'/getBlogCollectUserList/:pageNum?/:pageSize?/:id?',
	auth,
	validatorId,
	validatorPage,
	blogController.getBlogCollectUserList
);

// 是否点赞
router.get('/isLike/:id?', auth, validatorId, blogController.isLike);

// 是否收藏
router.get('/isCollect/:id?', auth, validatorId, blogController.isCollect);

// 获取某一用户博客列表
router.get(
	'/blog/userBlogList/:id?',
	auth,
	validatorId,
	blogController.getUserBlogList
);

// 文章评论
router.post('/comment', auth, commentController.blogComment);

// 修改评论
router.post(
	'/comment/update/:id',
	auth,
	validatorId,
	commentController.updateComment
);

// 删除评论
router.delete(
	'/comment/:id',
	auth,
	validatorId,
	commentController.removeComment
);

// 查询评论列表
router.get(
	'/getCommentList/:id/:pageNum/:pageSize',
	validatorId,
	commentController.getCommentList
);

// 查询子评论列表
router.get(
	'/getChildrenCommentList/:id/:pageNum/:pageSize',
	validatorId,
	commentController.getChildrenCommentList
);

// 获取推荐文章
router.get(
	'/getRecommendBlog/:id',
	validatorId,
	blogController.getRecommendBlogList
);

module.exports = router;