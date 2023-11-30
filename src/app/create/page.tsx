"use client";
import FormPost from "@/components/FormPost";
import { SubmitHandler } from "react-hook-form";
import { FormInputPost } from "../../types";
import BackButton from "@/components/BackButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Index from "@/components/Index";

const CreatePage = () => {
  const router = useRouter();
  const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
  };
  const { data: session, status } = useSession();

  const { mutate: createPost, isPending: isPendingSubmit } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.post("/api/posts/create", newPost);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  if (status === 'loading') {
    return <div className='text-center mt-11'>
      <span className='loading loading-spinner'>Loading...</span>
      </div>
  }

  if (!session) {
    return <Index />;
  }



  return (
    <div>
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">ADD NEW NOTE</h1>
      <FormPost
        submit={handleCreatePost}
        isEditing={false}
        isPendingSubmit={isPendingSubmit}
      />
    </div>
  );
};

export default CreatePage;
