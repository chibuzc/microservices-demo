export interface PostBody {
  id: string;
  title: string;
}

export interface Post {
  [key: string]: PostBody;
}
