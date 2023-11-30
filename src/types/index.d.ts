export type FormInputPost = {
  userId: string;
  title: string;
  content: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
};
