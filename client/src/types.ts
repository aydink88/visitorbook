export type TComment = {
  _id: string;
  name: string;
  text: string;
};

export type TPost = {
  _id: string;
  title: string;
  user: {
    username: string;
  };
  date: Date;
  image?: string;
  text: string;
  comments: TComment[];
};

export type TUser = {
  _id: string;
  avatar: string;
  username: string;
};

export type TStatus = "idle" | "pending" | "success" | "error";
