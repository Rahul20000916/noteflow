"use client";
import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
  initialValue?: FormInputPost;
  isPendingSubmit: boolean;
}
const FormPost: FC<FormPostProps> = ({
  submit,
  isEditing,
  initialValue,
  isPendingSubmit,
}) => {
  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });
  const { data: session, status } = useSession();

  const id = "get-all-tags";
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get(`/api/tags/${id}`);
      return response.data;
    },
  });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <input
        type="hidden"
        {...register("userId", { value: session?.user?.email ?? '' })}
      />
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="Note title"
        className="input input-bordered w-full max-w-lg"
      />
      <textarea
        {...register("content", { required: true })}
        className="textarea textarea-bordered w-full max-w-lg"
        placeholder="Note content"
      />
      {isLoadingTags ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <select
          {...register("tagId", { required: true })}
          className="select select-ghost w-full max-w-lg"
          defaultValue={initialValue?.tag?.id || ""}
        >
          <option disabled value="">
            Select tags
          </option>
          {dataTags?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
      <button type="submit" className="btn w-full max-w-lg border">
        {isPendingSubmit && <span className="loading loading-spinner"></span>}
        {isEditing
          ? isPendingSubmit
            ? "Update..."
            : "Update"
          : isPendingSubmit
          ? "Creating..."
          : "Create"}
      </button>
    </form>
  );
};

export default FormPost;
