export interface AddCommentWrapper {
	blog_id: number;
	user_id: number;
	content: string;
	parent_id?: number;
	[key: string]: any;
}
