import Blog from '../model/Blog';
import Blog_Tag from '../model/Blog_Tag';
import { BlogFind, BlogObject } from '../types/blog';

import User from '../model/User';

import { PageType } from '../types';

interface BlogService {
	createBlog(
		blogObject: BlogObject,
		tagIdList: number[],
		userId: number
	): Promise<boolean>;

	updateBlog(blog: Partial<Blog>): Promise<boolean>;

	updateBlog(blog: Partial<Blog>): Promise<boolean>;

	deleteBlog(id: number): Promise<boolean | undefined>;

	getBlogList(
		pageNum: number | undefined,
		pageSize: number | undefined,
		wrapper: BlogFind
	): Promise<PageType<Blog>>;

	getBlogInfo(id: string | number): Promise<Blog | null>;

	createBlog_tag(id: number, tags: number[]): Promise<boolean>;

	getBlog_tag(id: number): Promise<Blog_Tag[] | null>;

	getBlogListByTag(
		tags: number[],
		pageNum?: number,
		pageSize?: number
	): Promise<PageType<Blog>>;

	addRead(id: number): Promise<boolean>;

	likeArticle(id: number, user: User): Promise<boolean>;

	unlikeArticle(id: number, user: User): Promise<boolean>;

	getLikeList(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<PageType<Blog>>;

	getLikeUserList(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<{
		total: number;
		rows: Blog[];
	}>;

	collectArticle(id: number, user: User): Promise<boolean>;

	uncollectArticle(id: number, user: User): Promise<boolean>;

	getCollectList(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<PageType<Blog>>;

	getCollectUserList(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<PageType<Blog>>;

	getIsLikeStatus(
		blog_id: number,
		user_id: number
	): Promise<{
		status: boolean;
	}>;

	getIsCollectStatus(
		blog_id: number,
		user_id: number
	): Promise<{
		status: boolean;
	}>;

	getBlogListByUserId(id: number): Promise<void>;

	getRecommendBlog(id: number): Promise<false | PageType<Blog>>;

	getHotBlogList(pageNum: number, pageSize: number): Promise<Blog[]>;

	getBlogCount(): Promise<number>;

	getSubfield(): Promise<Blog[]>;

	getListBySubfield(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<PageType<Blog>>;

	search(query: string): Promise<Blog[]>;
}

export default BlogService;
