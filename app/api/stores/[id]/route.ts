// /app/api/stores/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Store from '@/app/models/Store';
import Inventory from '@/app/models/Inventory';

// GET: Obtener una tienda por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    // Find the store and populate the linked inventory
    const store = await Store.findById(id).populate('inventory_id');
    if (!store) {
      return NextResponse.json(
        { error: 'Tienda no encontrada' },
        { status: 404 },
      );
    }

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la tienda', details: error },
      { status: 500 },
    );
  }
}

// PUT: Actualizar una tienda por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const data = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    // Update the store information
    const updatedStore = await Store.findByIdAndUpdate(id, data, { new: true });
    if (!updatedStore) {
      return NextResponse.json(
        { error: 'Tienda no encontrada' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedStore, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la tienda', details: error },
      { status: 500 },
    );
  }
}

// DELETE: Eliminar una tienda por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    // Find the store to get the inventory ID
    const store = await Store.findById(id);
    if (!store) {
      return NextResponse.json(
        { error: 'Tienda no encontrada' },
        { status: 404 },
      );
    }

    // Delete the associated inventory
    await Inventory.findByIdAndDelete(store.inventory_id);

    // Delete the store
    const deletedStore = await Store.findByIdAndDelete(id);
    if (!deletedStore) {
      return NextResponse.json(
        { error: 'Tienda no encontrada' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Tienda e inventario eliminados exitosamente' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la tienda', details: error },
      { status: 500 },
    );
  }
}
