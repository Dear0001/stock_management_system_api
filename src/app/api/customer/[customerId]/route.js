import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET(req, {params: {customerId}}) {
    try {
        const customer = await prisma.customers.findFirst({
            where: {
                customer_id: parseInt(customerId)
            }
        });
        if(!customer) {
                return NextResponse.json({
                status: 404,
                message: `Get customer with id ${customerId} not found.`
            });
        }else {
            return NextResponse.json({
                status: 200,
                message: `Get customer with id ${customerId} successfully.`,
                payload: customer
            });
        }
    }catch (error){
        return NextResponse.json({
            status: 500,
            message: "Error retrieving customer."
        });
    }
}

export async function PUT(req, {params: {customerId} }) {
    try {
        const body = await req.json();
        const {first_name, last_name, birth_date, money_spent } = body;
        const updateCustomers = await prisma.customers.update({
            where: {
                customer_id: parseInt(customerId)
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                birth_date: birth_date,
                money_spent: money_spent
            }
        });
        return NextResponse.json({
            status: 200,
            message: `Customer with id ${customerId} is updated successfully.`,
            payload: updateCustomers
        });
    }catch (error) {
        return NextResponse.json({
            status: 404,
            message: `Customer with id ${customerId} not found.`
        });
    }

}

export async function DELETE(req, {params: {customerId }}) {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                customer_id: parseInt(customerId)
            }
        });

        if (orders.length > 0) {
            return NextResponse.json({
                status: 409,
                message: `Customer with id ${customerId} cannot be deleted as they have existing orders.`,
                orders: orders
            });
        }

        const body = await prisma.customers.delete({
            where: {
                customer_id: parseInt(customerId)
            }
        });

        return NextResponse.json({
            status: 200,
            message: `Customer with id ${customerId} is deleted successfully.`,
            payload: body
        });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: `Customer with id ${customerId} not found.`
        });
    }
}
