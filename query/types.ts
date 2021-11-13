export interface QueryServicePost {
  id: string;
  title: string;
  comments: QueryServiceComment[];
}

export interface QueryServicePostMap {
  [key: string]: QueryServicePost;
}

export interface QueryServiceComment {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}

export interface QueryServiceCommentMap {
  [key: string]: QueryServiceComment[];
}
