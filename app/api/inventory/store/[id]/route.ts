// /app/api/inventories/[storeId]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Inventory from '@/app/models/Inventory';

// GET: Obtener inventario por store_id
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();
    const { id } = params;

    // Validate if storeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'store_id no válido' },
        { status: 400 },
      );
    }

    // Retrieve the inventory for the given storeId
    const inventory = await Inventory.findOne({ store_id: id });

    // Check if inventory exists for this store
    if (!inventory) {
      return NextResponse.json(
        { error: 'Inventario no encontrado para esta tienda' },
        { status: 404 },
      );
    }

    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el inventario', details: error },
      { status: 500 },
    );
  }
}
