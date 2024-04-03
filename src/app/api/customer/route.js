import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    const req = await prisma.customers.findMany();

    return NextResponse.json ({
        status: 200,
        message: "Get all customers Successfully",
        payload: req
        }
    )
}

export async function POST(req) {
    try {
        const body = await req.json();
        const {first_name, last_name, birth_date, money_spent} = body;
        const newCustomers = await prisma.customers.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                birth_date: birth_date,
                money_spent: money_spent
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Created customers successfully.",
            payload: newCustomers
        });
    }catch (error){
        return NextResponse.json({
            status: 404,
            message: "Customer cannot create"
        });
    }

}