export interface CommentsByPostIdBody {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}

export interface CommentsByPostId {
  [key: string]: CommentsByPostIdBody[];
}
