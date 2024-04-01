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
        return NextResponse.json({
            status: 200,
            message: `Get order by customer  id ${customerId} Successfully.`,
            payload: body
        });
}