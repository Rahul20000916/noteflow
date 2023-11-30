import { Tag } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

interface PostCardProps{
  post:{
    id: String;
    title: String;
    content: String;
    tag: Tag;
  }
}

const PostCard: FC<PostCardProps> = ({post}) => {
  const {id, title, content, tag} = post;
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl border">
        <div className="card-body">
        <span className="badge badge-ghost">{tag.name}</span>
          <h2 className="card-title">{title}</h2>
          <p>{content.slice(0, 30)}</p>
          <div className="card-actions justify-end">
            <Link href={`/note/${id}`}>Read more...</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
