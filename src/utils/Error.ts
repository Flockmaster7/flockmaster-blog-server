const errorForm = (code: string | number, message: string, data: string) => {
	return {
		code,
		message,
		data
	};
};

export default {
	userFormateError: errorForm('11111', '用户名或密码不能为空', ''),
	userAlreadExist: errorForm('10001', '用户已经存在', ''),
	userRegisterError: errorForm('10001', '用户注册失败', ''),
	userDoesNotExist: errorForm('10001', '用户不存在', ''),
	userLoginError: errorForm('10001', '用户登录失败', ''),
	validatPasswordError: errorForm('11111', '密码错误', ''),
	removeUserError: errorForm('10001', '删除用户失败', ''),
	tokenExpiredError: errorForm('10101', 'token已过期', ''),
	invalidTokenError: errorForm('10102', '无效token', ''),
	userChangePasswordError: errorForm('10001', '修改密码失败', ''),
	getUserInfoError: errorForm('10001', '获取用户信息失败', ''),
	updateUserInfoError: errorForm('10001', '修改用户信息失败', ''),
	hasNotAdminPermission: errorForm('10002', '没有管理员权限', ''),
	focusUserError: errorForm('10001', '关注用户失败', ''),
	unfocusUserError: errorForm('10001', '取消关注用户失败', ''),
	getUserFollowListError: errorForm('10001', '获取关注列表失败', ''),
	getUserFansListError: errorForm('10001', '获取粉丝列表失败', ''),
	isFollowUserError: errorForm('10001', '获取关注状态失败', ''),
	getAdminInfoError: errorForm('10001', '获取管理员信息失败', ''),
	getUserListError: errorForm('10001', '获取用户列表失败', ''),
	uploadError: errorForm('10001', '上传失败', ''),
	markdownRenderError: errorForm('10001', 'md文件解析失败', ''),
	FormValidatorError: errorForm('11111', '参数错误', ''),
	createBlogError: errorForm('10001', '发布博客失败', ''),
	updateBlogError: errorForm('10001', '修改博客失败', ''),
	getBlogDetailError: errorForm('10001', '获取文章详情失败', ''),
	getBlogListError: errorForm('10001', '获取文章列表失败', ''),
	createWorkError: errorForm('10001', '添加作品失败', ''),
	updateWorkError: errorForm('10001', '修改作品失败', ''),
	getWorkDetailError: errorForm('10001', '获取作品详情失败', ''),
	getWorkListError: errorForm('10001', '获取作品列表失败', ''),
	validatorIdError: errorForm('11111', '必须携带id', ''),
	validatorPageError: errorForm('11111', '必须携带pageNum和pageSize', ''),
	validatorNullError: errorForm('11111', '不能为null', ''),
	removeWorkError: errorForm('10001', '删除作品失败', ''),
	createTagError: errorForm('10001', '添加标签失败', ''),
	updateTagError: errorForm('10001', '修改标签失败', ''),
	removeTagError: errorForm('10001', '删除标签失败', ''),
	getTagListError: errorForm('10001', '获取标签列表失败', ''),
	deleteBlogError: errorForm('10001', '删除博客失败', ''),
	addBlogReadError: errorForm('10001', '增加阅读量失败', ''),
	likeBlogError: errorForm('10001', '点赞失败', ''),
	unlikeBlogError: errorForm('10001', '取消点赞失败', ''),
	getUserLikeListError: errorForm('10001', '获取点赞的文章列表失败', ''),
	getBlogLikeUserListError: errorForm(
		'30016',
		'获取某一文章点赞用户列表失败',
		''
	),
	collectBlogError: errorForm('10001', '收藏失败', ''),
	uncollectBlogError: errorForm('10001', '取消收藏失败', ''),
	getUserCollectListError: errorForm('10001', '获取收藏的文章列表失败', ''),
	getBlogCollectUserListError: errorForm(
		'30019',
		'获取某一文章收藏用户列表失败',
		''
	),
	getStatusError: errorForm('10001', '获取状态失败', ''),
	getRecommendBlogListError: errorForm('10001', '获取推荐文章失败', ''),
	topBlogError: errorForm('10001', '置顶失败', ''),
	cancelTopBlogError: errorForm('10001', '取消置顶失败', ''),
	getSubfieldError: errorForm('10001', '获取分栏失败', ''),
	addSubfieldError: errorForm('10001', '添加分栏失败', ''),
	updateSubfieldError: errorForm('10001', '修改分栏失败', ''),
	removeSubfieldError: errorForm('10001', '删除分栏失败', ''),
	getSubfieldDetailError: errorForm('10001', '获取分栏详情失败', ''),
	getBlogListBySubfieldError: errorForm(
		'30028',
		'获取分栏下的文章列表失败',
		''
	),
	addCommentError: errorForm('10001', '发布评论失败', ''),
	getCommentListError: errorForm('10001', '获取评论列表失败', ''),
	removeCommentError: errorForm('10001', '删除评论失败', ''),
	updateCommentError: errorForm('10001', '修改评论失败', ''),
	dianzanCommentError: errorForm('10001', '点赞失败', ''),
	cancelDianzanCommentError: errorForm('10001', '取消点赞失败', ''),
	addLeaveWordsError: errorForm('10001', '发布留言失败', ''),
	getLeaveWordsListError: errorForm('10001', '获取留言列表失败', ''),
	removeLeaveWordsError: errorForm('10001', '删除留言失败', ''),
	updateLeaveWordsError: errorForm('10001', '修改留言失败', ''),
	dianzanLeavewordsError: errorForm('10001', '点赞失败', ''),
	cancelDianzanLeavewordsError: errorForm('10001', '取消点赞失败', ''),
	createAlbumError: errorForm('10001', '添加相册失败', ''),
	updateAlbumError: errorForm('10001', '修改相册失败', ''),
	removeAlbumError: errorForm('10001', '删除作品失败', ''),
	createPhotoError: errorForm('10001', '添加相册图片失败', ''),
	removePhotoError: errorForm('10001', '删除相册图片失败', ''),
	updatePhotoError: errorForm('10001', '修改相册图片失败', ''),
	getPhotoListError: errorForm('10001', '修改相册图片失败', ''),
	getAllPhotoListError: errorForm('10001', '修改所有相册图片失败', ''),
	addVisitError: errorForm('10001', '增加网站访问量失败', ''),
	getWebsiteInfoError: errorForm('10001', '获取网站资讯失败', ''),
	getLatestCommentError: errorForm('10001', '获取首页最新评论成功', ''),
	getgetHotBlogsError: errorForm('10001', '获取首页热门文章成功', ''),
	getCircleFriendListError: errorForm('10001', '获取朋友圈失败', ''),
	getCircleFriendDetailError: errorForm('10001', '获取朋友圈详情失败', ''),
	postCircleFriendError: errorForm('10001', '发布朋友圈失败', ''),
	removeCircleFriendError: errorForm('10001', '删除朋友圈失败', ''),
	updateCircleFriendError: errorForm('10001', '修改朋友圈失败', ''),
	dianzanCircleFriendError: errorForm('10001', '点赞失败', ''),
	cancelDianzanCircleFriendError: errorForm('10001', '取消点赞失败', ''),
	topCircleFriendError: errorForm('10001', '置顶失败', ''),
	cancelTopCircleFriendError: errorForm('10001', '取消置顶失败', ''),
	addCircleFriendCommentError: errorForm('10001', '添加朋友圈评论失败', ''),
	removeCircleFriendCommentError: errorForm(
		'10001',
		'删除朋友圈评论失败',
		''
	),
	updateCircleFriendCommentError: errorForm(
		'10001',
		'修改朋友圈评论失败',
		''
	),
	getCommentListByCircleFriendIdError: errorForm(
		'10001',
		'获取朋友圈评论列表失败',
		''
	),
	getRoleListError: errorForm('10001', '获取角色列表失败', ''),
	getRoleDetailError: errorForm('10001', '获取角色详情失败', ''),
	addRoleError: errorForm('10001', '添加角色失败', ''),
	updateRoleError: errorForm('10001', '修改角色失败', ''),
	removeRoleError: errorForm('10001', '删除角色失败', ''),
	getPermissionListError: errorForm('10001', '获取权限列表失败', ''),
	getPermissionDetailError: errorForm('10001', '获取权限详情失败', ''),
	addPermissionError: errorForm('10001', '添加权限失败', ''),
	updatePermissionError: errorForm('10001', '修改权限失败', ''),
	removePermissionError: errorForm('10001', '删除权限失败', ''),
	getMessageListError: errorForm('10001', '获取消息列表失败', ''),
	getMessageDetailError: errorForm('10001', '获取消息详情失败', ''),
	addMessageError: errorForm('10001', '添加消息失败', ''),
	updateMessageError: errorForm('10001', '修改消息失败', ''),
	removeMessageError: errorForm('10001', '删除消息失败', ''),
	getNoticeListError: errorForm('10001', '获取通知列表失败', ''),
	getNoticeDetailError: errorForm('10001', '获取通知详情失败', ''),
	addNoticeError: errorForm('10001', '添加通知失败', ''),
	updateNoticeError: errorForm('10001', '修改通知失败', ''),
	removeNoticeError: errorForm('10001', '删除通知失败', ''),
	getNoReadError: errorForm('10001', '获取未读条数失败', ''),
	validatorParamsError: errorForm('11111', '参数错误', '')
};
