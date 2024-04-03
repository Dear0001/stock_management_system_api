import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET(req, { params: { customerId } }) {
    const body = await prisma.orders.findMany({
        where: {
            customer_id: parseInt(customerId)
        },
        // include: {
        //     category: true
        // }
    });
    if (body.length === 0) {
        return NextResponse.json({
            status: 404,
            message: `Order customer by id ${customerId} not found.`
        });

    }else {
        return NextResponse.json({
            status: 200,
            message: `Get order by customer  id ${customerId} Successfully.`,
            payload: body
        });
    }

}