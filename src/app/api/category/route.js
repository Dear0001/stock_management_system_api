import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET() {
  const req = await prisma.categories.findMany();

  return NextResponse.json ({
      status: 200,
      message: "Get all categories Success",
      payload: req
      }
  )
}

export async function POST(req) {
    const body = await req.json();
    const {category_name} = body;
    const newCategories = await prisma.categories.createMany({
        data: category_name
    });
    return NextResponse.json({
        status: 200,
        message: "Created categories successful",
        payload: newCategories,
    });
}