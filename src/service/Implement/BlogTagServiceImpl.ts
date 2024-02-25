import Blog_Tag from '../../model/Blog_Tag';
import BolgTagService from '../BolgTagService';

class BolgTagServiceImpl implements BolgTagService {
	async deleteBlogTagByBlogId(id: number) {
		const wrapper = {
			blog_id: id
		};
		const res = await Blog_Tag.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}
}

export default BolgTagServiceImpl;
