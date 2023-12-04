import User_Blog_Like from '../model/User_Blog_Like';

class User_Blog_LikeService {
	// 删除
	async deleteUserBlogLikeById(blog_id: number, user_id: number) {
		const wrapper = {
			blog_id,
			user_id
		};
		const res = await User_Blog_Like.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}
}

export default User_Blog_LikeService;
