import { WebsiteType } from '../types';
import Comment from '../model/Comment';
import Blog from '../model/Blog';

interface CommonService {
	// 增加网站访问量
	addWebsiteVisit(userAgent: string): Promise<boolean>;

	// 获取网站资讯
	getWebsite(): Promise<WebsiteType>;

	// 将访问量写入数据库
	addVisitNum(num: number): Promise<boolean>;

	getLatestComments(): Promise<Comment[]>;

	getHotBlogs(): Promise<Blog[]>;
}

export default CommonService;
