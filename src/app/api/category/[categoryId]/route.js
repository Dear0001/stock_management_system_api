import { prisma } from "@/app/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params: { categoryId } }) {
    try {
        let category;
        if (!isNaN(categoryId)) {
            category = await prisma.categories.findUnique({
                where: { id: +categoryId}
            });
            if(category){
                return NextResponse.json({
                    status: 200,
                    message: `Get category with id ${categoryId} successfully`,
                    payload: category
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    message: `Category with id ${categoryId} not found`
                });
            }

        } else {
            category = await prisma.categories.findMany({
                where: {
                    category_name:   categoryId.toLowerCase()
                }
            });
            if (category.length > 0) {
                return NextResponse.json({
                    status: 200,
                    message: `Get category  ${categoryId} successfully`,
                    payload: category
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    message: `Category  ${categoryId} not found`
                });
            }

        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: `Error retrieving category`
        });
    }
}

export async function PUT(req, { params: { categoryId } }) {
    const body = await req.json();
    const {category_name} = body;
    try {
        const updateCategories = await prisma.categories.update({
            where: {
                id: +categoryId,
            },
            data: {
                category_name: category_name
            }
        });
        return NextResponse.json({
            status: 200,
            message: `Category with id ${categoryId} is updated successful`,
            payload: updateCategories,
        });
    } catch (error) {
            return NextResponse.json({
                status: 404,
                message: `Category with id ${categoryId} not found.`
        })
    }
}