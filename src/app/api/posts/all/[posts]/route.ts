import { db } from "@/lib/db";
import { NextResponse } from "next/server";
interface contextProps {
  params: {
    posts: string;
  };
}

export async function GET(req: Request, context: contextProps) {
    try {
        const response = await db.post.findMany({
          where: {
            userId: context.params.posts,
          },
              select:{
                id: true,
                title: true,
                content: true,
                tag: true,
              },
              orderBy: {
                createdAt: 'desc'
              }
            });
        return NextResponse.json(response, {status: 200})
    }catch(error){
        return NextResponse.json({message: 'could not fetching post'}, {status: 500})
    }
    
}