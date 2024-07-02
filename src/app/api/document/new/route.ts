import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const { title, description } = await req.json();

    const createNewDoc = await db.document.create({
      data: {
        userId: userId,
        title: title,
        description: description,
      },
    });

    revalidatePath("/");
    return NextResponse.json(createNewDoc, { status: 200 });
  } catch (error) {
    return new NextResponse("POST, NEW DOC ERROR", { status: 500 });
  }
}
