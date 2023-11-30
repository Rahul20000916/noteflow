"use client";
import { LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SigninButon = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        <div className="flex-none">
          <Link href="/create" className="btn btn-ghost mr-3">
            Create note
          </Link>
        </div>
        <div className="flex gap-4 ml-auto ">
          <img
            className="w-6 h-6 mt-3"
            src={session.user.image ?? ""}
            alt="google logo"
          />
          <p className="mt-3">{session.user.name}</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <LogOut />
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SigninButon;
