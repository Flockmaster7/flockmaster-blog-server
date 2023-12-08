const errorForm = (code: string | number, message: string, data: string) => {
	return {
		code,
		message,
		data
	};
};

export default {
	userFormateError: errorForm('10001', '用户名或密码不能为空', ''),
	userAlreadExist: errorForm('10002', '用户已经存在', ''),
	userRegisterError: errorForm('10003', '用户注册失败', ''),
	userDoesNotExist: errorForm('10004', '用户不存在', ''),
	userLoginError: errorForm('10005', '用户登录失败', ''),
	validatPasswordError: errorForm('10006', '密码错误', ''),
	removeUserError: errorForm('10007', '删除用户失败', ''),
	tokenExpiredError: errorForm('401', 'token已过期', ''),
	invalidTokenError: errorForm('10102', '无效token', ''),
	userChangePasswordError: errorForm('10007', '修改密码失败', ''),
	getUserInfoError: errorForm('10008', '获取用户信息失败', ''),
	updateUserInfoError: errorForm('10009', '修改用户信息失败', ''),
	hasNotAdminPermission: errorForm('10010', '没有管理员权限', ''),
	focusUserError: errorForm('10011', '关注用户失败', ''),
	unfocusUserError: errorForm('10012', '取消关注用户失败', ''),
	getUserFollowListError: errorForm('10013', '获取关注列表失败', ''),
	getUserFansListError: errorForm('10014', '获取粉丝列表失败', ''),
	isFollowUserError: errorForm('10015', '获取关注状态失败', ''),
	getAdminInfoError: errorForm('10016', '获取管理员信息失败', ''),
	getUserListError: errorForm('10016', '获取用户列表失败', ''),
	uploadError: errorForm('20001', '上传失败', ''),
	markdownRenderError: errorForm('20002', 'md文件解析失败', ''),
	FormValidatorError: errorForm('20003', '参数错误', ''),
	createBlogError: errorForm('20004', '发布博客失败', ''),
	getBlogDetailError: errorForm('20005', '获取文章详情失败', ''),
	getBlogListError: errorForm('20005', '获取文章列表失败', ''),
	createWorkError: errorForm('30001', '添加作品失败', ''),
	updateWorkError: errorForm('30002', '修改作品失败', ''),
	getWorkDetailError: errorForm('30003', '获取作品详情失败', ''),
	getWorkListError: errorForm('30004', '获取作品列表失败', ''),
	validatorIdError: errorForm('30005', '必须携带id', ''),
	validatorPageError: errorForm('30006', '必须携带pageNum和pageSize', ''),
	validatorNullError: errorForm('30020', '不能为null', ''),
	removeWorkError: errorForm('30007', '删除作品失败', ''),
	createTagError: errorForm('30008', '添加标签失败', ''),
	updateTagError: errorForm('30009', '修改标签失败', ''),
	removeTagError: errorForm('30010', '删除标签失败', ''),
	getTagListError: errorForm('30011', '获取作品列表失败', ''),
	deleteBlogError: errorForm('30012', '删除博客失败', ''),
	addBlogReadError: errorForm('30013', '增加阅读量失败', ''),
	likeBlogError: errorForm('30014', '点赞失败', ''),
	unlikeBlogError: errorForm('30014', '取消点赞失败', ''),
	getUserLikeListError: errorForm('30015', '获取点赞的文章列表失败', ''),
	getBlogLikeUserListError: errorForm(
		'30016',
		'获取某一文章点赞用户列表失败',
		''
	),
	collectBlogError: errorForm('30016', '收藏失败', ''),
	uncollectBlogError: errorForm('30017', '取消收藏失败', ''),
	getUserCollectListError: errorForm('30018', '获取收藏的文章列表失败', ''),
	getBlogCollectUserListError: errorForm(
		'30019',
		'获取某一文章收藏用户列表失败',
		''
	),
	getStatusError: errorForm('30019', '获取状态失败', ''),
	getRecommendBlogListError: errorForm('30020', '获取推荐文章失败', ''),
	addCommentError: errorForm('40001', '发布评论失败', ''),
	getCommentListError: errorForm('40002', '获取评论列表失败', ''),
	removeCommentError: errorForm('40003', '删除评论失败', ''),
	updateCommentError: errorForm('40004', '修改评论失败', ''),
	addLeaveWordsError: errorForm('50001', '发布留言失败', ''),
	getLeaveWordsListError: errorForm('50002', '获取留言列表失败', ''),
	removeLeaveWordsError: errorForm('50003', '删除留言失败', ''),
	updateLeaveWordsError: errorForm('50004', '修改留言失败', ''),
	dianzanLeavewordsError: errorForm('50005', '点赞失败', ''),
	cancelDianzanLeavewordsError: errorForm('50006', '取消点赞失败', ''),
	createAlbumError: errorForm('60001', '添加相册失败', ''),
	updateAlbumError: errorForm('60002', '修改相册失败', ''),
	removeAlbumError: errorForm('60003', '删除作品失败', ''),
	createPhotoError: errorForm('60004', '添加相册图片失败', ''),
	removePhotoError: errorForm('60005', '删除相册图片失败', ''),
	updatePhotoError: errorForm('60006', '修改相册图片失败', ''),
	getPhotoListError: errorForm('60007', '修改相册图片失败', ''),
	getAllPhotoListError: errorForm('60008', '修改所有相册图片失败', ''),
	addVisitError: errorForm('70001', '增加网站访问量失败', ''),
	getWebsiteInfoError: errorForm('70002', '获取网站资讯失败', ''),
	getLatestCommentError: errorForm('70003', '获取首页最新评论成功', ''),
	getgetHotBlogsError: errorForm('70004', '获取首页热门文章成功', '')
};
