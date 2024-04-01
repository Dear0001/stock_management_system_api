import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET(req, { params: { categoryId } }) {
    const product = await prisma.products.findMany({
        where: {
            category_id: parseInt(categoryId)
        },
        // include: {
        //     category: true
        // }
    });
        return NextResponse.json({
            status: 200,
            message: `Get products by category  id ${categoryId} Successfully.`,
            payload: product
        });
}