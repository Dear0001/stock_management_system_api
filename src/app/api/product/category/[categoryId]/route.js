import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET(req, { params: { categoryId } }) {
    try {
        const product = await prisma.products.findMany({
            where: {
                category_id: parseInt(categoryId)
            },
            // include: {
            //     category: true
            // }
        });
        if(product.length > 0){
            return NextResponse.json({
                status: 200,
                message: `Get products by category id ${categoryId} Successfully.`,
                payload: product
            });
        }else {
            return NextResponse.json({
                status: 404,
                message: `No products found for category id ${categoryId}.`
            });
        }
    }catch (error){
        return NextResponse.json({
            status: 404,
            message: `Error retrieving products by category id ${categoryId}.`
        });
    }

}