interface UserBlogLikeService {
	deleteUserBlogLikeById(blog_id: number, user_id: number): Promise<boolean>;
}

export default UserBlogLikeService;
