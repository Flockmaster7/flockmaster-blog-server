interface BolgTagService {
	deleteBlogTagByBlogId(id: number): Promise<boolean>;
}

export default BolgTagService;
