import { WebsiteType } from '../types';

interface DataService {
	addWebsiteVisit(userAgent: string): Promise<boolean>;

	getDailyNum(): Promise<Partial<WebsiteType>>;

	getBlogClassifiy(): Promise<any>;

	getModuleNum(): Promise<any>;

	getHotBlog(): Promise<any>;
}

export default DataService;
