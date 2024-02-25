interface UserBlogCollectService {
	deleteUserBlogCollectById(
		blog_id: number,
		user_id: number
	): Promise<boolean>;
}

export default UserBlogCollectService;
