// /app/api/inventory/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import Inventory from '@/app/models/Inventory';
import Product from '@/app/models/Product';

// GET: Obtener todos los inventarios
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const inventories = await Inventory.find().populate('products.product_id');
    return NextResponse.json(inventories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los inventarios', details: error },
      { status: 500 },
    );
  }
}

// POST: Crear un nuevo inventario
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validate products against the Product collection
    const productIds = data.products.map((p: any) => p.product_id);
    const existingProducts = await Product.find({ _id: { $in: productIds } });
    if (existingProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Uno o más productos no existen' },
        { status: 400 },
      );
    }

    const newInventory = new Inventory(data);
    const savedInventory = await newInventory.save();
    return NextResponse.json(savedInventory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el inventario', details: error },
      { status: 500 },
    );
  }
}
