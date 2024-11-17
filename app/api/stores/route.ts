// /app/api/stores/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Store from '@/app/models/Store';
import Inventory from '@/app/models/Inventory';

// POST: Crear una nueva tienda
export async function POST(req: Request) {
  try {
    const { name, address, contact } = await req.json();

    await connectToDatabase();

    // Create the Store first, so we can use the store's _id when creating the inventory
    const newStore = await Store.create({
      name,
      address,
      contact,
      inventory_id: new mongoose.Types.ObjectId(), // Temporary inventory reference
    });

    // Now create the Inventory and associate it with the new store
    const newInventory = await Inventory.create({
      store_id: newStore._id, // Link inventory to store
      products: [],
    });

    // Update the store with the correct inventory reference
    newStore.inventory_id = newInventory._id;
    await newStore.save();

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error(error, 'Error in creating store');
    return NextResponse.json(
      { error: 'Error al crear la tienda', details: error },
      { status: 500 },
    );
  }
}

// GET: Obtener todas las tiendas
export async function GET() {
  try {
    await connectToDatabase();
    const stores = await Store.find().populate('inventory_id');

    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve stores' },
      { status: 500 },
    );
  }
}
