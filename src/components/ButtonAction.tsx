"use client";
// import Link from "next/link";
import { PenSquare, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  return (
    <div>
      {/* <Link href={`/edit/${id}`} className='btn mr-2'>
      <PenSquare />Edit</Link> */}
      
      <a href={`/edit/${id}`} className="btn mr-2">
        <PenSquare />
        Edit
      </a>

      <button onClick={() => deletePost()} className="btn btn-error">
        {isPending && <span className="loading loading-spinner"></span>}
        {isPending ? (
          "Loading..."
        ) : (
          <>
            <Trash />
            Delete
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonAction;
