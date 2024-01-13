export interface ResultType<T> {
	code: number;
	data: T;
	message: string;
}

export interface PageType<T> {
	total: number;
	rows: T[];
	pageNum: number;
	pageSize: number;
}

export interface WebsiteType {
	website_visit: string | number;
	website_visit_today: string | number;
	website_blogs: string | number;
	website_tags: string | number;
	website_works: string | number;
	website_leaveWords: string | number;
}

export interface Upload {
	images: { imageUrl: string }[];
	videos: { videoUrl: string }[];
}
