export interface CommentsByPostIdBody {
  id: string;
  content: string;
}

export interface CommentsByPostId {
  [key: string]: CommentsByPostIdBody[];
}
