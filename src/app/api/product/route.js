import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET(){
    const req = await prisma.products.findMany();
    return NextResponse.json({
        status: 200,
        message: "Get all products Successfully.",
        payload: req
    })
}



export async function POST(req){
    const body =  await req.json();
    const {product_name, price, category_id} = body;
    const addNewProduct = await prisma.products.createMany({
        data: {
            product_name: product_name,
            category_id: category_id,
            price: price
        }
    });
    return NextResponse.json({
        status: 200,
        message: "Created product Successfully.",
        payload: addNewProduct
    })
}
