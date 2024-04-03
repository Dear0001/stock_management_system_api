import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";


export async function GET() {
    const order = await prisma.orders.findMany();

    return NextResponse.json({
        status: 200,
        message: "Get all orders Successfully.",
        payload: order
    });

}

export async function POST(req) {
    try {
        const body = await req.json();
        const { product_id, customer_id, order_qty } = body;

        const product = await prisma.products.findUnique({
            where: { product_id }
        });

        if (!product) {
            return NextResponse.json({
                   status: 404,
                message: `Product with id ${product_id} not found.`
            });
        }
        const { price } = product;
        const order_total = price * order_qty;
        // Create the order
        const addOrder = await prisma.orders.create({
            data: {
                product_id,
                customer_id,
                order_qty,
                order_total
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Created new order successfully.",
            payload: addOrder
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error."
        });
    }
}