import {prisma} from "@/app/prisma/prisma";
import {NextResponse} from "next/server";
export async function GET(req, { params: { productId } }) {
    try {
        let product;
        if (!isNaN(productId)) {
            product = await prisma.products.findUnique({
                where: {
                    product_id: +productId
                }
            });
            if(product){
                return NextResponse.json({
                    status: 200,
                    message: `Get product with id ${productId} successfully.`,
                    payload: product
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    message: `Product with id ${productId} not found.`
                });
            }

        } else {
            product = await prisma.products.findMany({
                where: {
                    product_name:   productId
                }
            });
            if (product.length > 0) {
                return NextResponse.json({
                    status: 200,
                    message: `Get product  ${productId} successfully.`,
                    payload: product
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    message: `Product  ${productId} not found.`
                });
            }

        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: `Error retrieving product.`
        });
    }
}

//Put

export async function PUT(req, { params: { productId } }) {
    const body = await req.json();
    const {product_name, category_id, price} = body;
    try {
        const updateProduct = await prisma.products.update({
            where: {
                product_id: +productId,
            },
            data: {
                product_name: product_name,
                category_id: category_id,
                price: price
            }
        });
        return NextResponse.json({
            status: 200,
            message: `Product with id ${productId} is updated successfully.`,
            payload: updateProduct,
        });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: `Product with id ${productId} not found.`
        })
    }
}

//delete product by id

export async function DELETE(req, {params: {productId}}) {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                product_id: parseInt(productId)
            }
        });

        if (orders.length > 0) {
            return NextResponse.json({
                status: 409,
                message: `Product with id ${productId} cannot be deleted as they have existing orders.`,
                orders: orders
            });
        }

        const body = await prisma.customers.delete({
            where: {
                product_id: parseInt(productId)
            }
        });

        return NextResponse.json({
            status: 200,
            message: `Product with id ${productId} is deleted successfully.`,
            payload: body
        });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: `Product with id ${productId} not found.`
        });
    }
}

