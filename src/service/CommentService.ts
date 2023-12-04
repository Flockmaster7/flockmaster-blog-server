import Comment from '../model/Comment';

interface CommentService {
	// 发布评论
	addComment(wrapper: any): Promise<Comment>;

	// 获取评论列表
	getComment(id: number, pageNum: number, pageSize: number): any;

	// 获取子评论
	getChildComment(parent_id: number, pageNum: number, pageSize: number): any;

	// 删除评论
	deleteComment(id: number): Promise<boolean>;
	//修改评论
	modifyComment(comment: Comment, id: number): Promise<boolean>;

	getLatestComment(pageNum: number, pageSize: number): Promise<Comment[]>;
}

export default CommentService;
