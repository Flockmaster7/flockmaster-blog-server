import Blog from '../model/Blog';
import User_Blog_Collect from '../model/User_Blog_Collect';

class User_Blog_CollectService {
	// 删除
	async deleteUserBlogCollectById(blog_id: number, user_id: number) {
		const wrapper = {
			blog_id,
			user_id
		};
		const res = await User_Blog_Collect.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}
}

export default User_Blog_CollectService;
