import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET(req, {params: {orderId}}) {
    try {
        const body = await prisma.orders.findUnique({
            where: {
                order_id: +orderId
            }
        });
        if(!body){
            return NextResponse.json({
                status: 404,
                message: `Order with id ${orderId} not found.`
            })
        }else {
            return NextResponse.json({
                status: 200,
                message: `Get order with id ${orderId} Successfully.`,
                payload: body
            });
        }
    }catch (error){
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

export async function PUT(req, {params: {orderId}}){
    try {
        const body = await req.json();
        const { product_id, customer_id, order_qty } = body;
        const product = await prisma.products.findUnique({
            where: {
                product_id: product_id
            }
        });
        // Calculate the total order price
        const { price } = product;
        const order_total = price * order_qty;
        const updateOrder = await prisma.orders.update({
            where: {
                order_id: +orderId
            },
            data: {
                product_id: product_id,
                customer_id: customer_id,
                order_qty: order_qty,
                order_total: order_total
            }
        });
        return NextResponse.json({
            status: 200,
            message: `Order with id ${orderId} is updated successfully`,
            payload: updateOrder
        });
    }catch (error){
        return NextResponse.json({
            status: 404,
            message: `Order with id ${orderId} not found`
        });
    }
}


export async function DELETE(req, {params: {orderId}}) {
    try {
        const body = await prisma.orders.delete({
            where: {
                order_id: +orderId
            }
        });
        return NextResponse.json({
            status: 200,
            message: `Order with id ${orderId} is deleted Successfully.`,
            payload: body
        });
    }catch (error){
        return NextResponse.json({
            status: 404,
            message: `Order with id ${orderId} not found.`
        })
    }
}