// /app/api/products/route.ts
import connectToDatabase from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import { NextResponse } from 'next/server';

// POST: Crear un nuevo producto
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validar campos obligatorios
    if (!data.name || !data.category || !data.barcode || !data.price) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 },
      );
    }

    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el producto', details: error },
      { status: 500 },
    );
  }
}

// GET: Obtener todos los productos
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los productos', details: error },
      { status: 500 },
    );
  }
}
