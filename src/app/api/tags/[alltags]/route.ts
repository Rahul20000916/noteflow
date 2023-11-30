import { db } from "@/lib/db";
import { NextResponse } from "next/server";
interface contextProps {
    params: {
        alltags: string;
    };
  }
  
export async function GET(req: Request, context: contextProps) {
    try {
        const tags = await db.tag.findMany();
        return NextResponse.json(tags, {status: 200})
    }catch(error){
        return NextResponse.json({message: 'could not fetch tags'}, {status: 500})
    }
    
}