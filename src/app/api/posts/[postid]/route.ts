import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    postid: string;
  };
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const post = await db.post.findUnique({
      where: {
        id: params.postid,
      },
      select: {
        id: true,
        title: true,
        content: true,
        tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (post) {
      return NextResponse.json(post, { status: 200 });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;
    await db.post.delete({
      where: {
        id: params.postid,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Could not delete post" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    await db.post.update({
      where: {
        id: params.postid,
      },
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tagId,
      },
    });
    return NextResponse.json({ message: "update success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not update post" },
      { status: 500 }
    );
  }
}
