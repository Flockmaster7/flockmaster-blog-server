import User_Blog_Collect from '../../model/User_Blog_Collect';
import UserBlogCollectService from '../UserBlogCollectService';

class UserBlogCollectServiceImpl implements UserBlogCollectService {
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

export default UserBlogCollectServiceImpl;
