// /app/api/suppliers/route.ts
import connectToDatabase from '@/app/lib/mongodb';
import Supplier from '@/app/models/Supplier';
import { NextResponse } from 'next/server';

// POST: Crear un nuevo proveedor
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validar campos obligatorios
    if (!data.store_id || !data.name || !data.contact) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const newSupplier = new Supplier(data);
    const savedSupplier = await newSupplier.save();

    return NextResponse.json(savedSupplier, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el proveedor', details: error }, { status: 500 });
  }
}

// GET: Obtener todos los proveedores
export async function GET() {
  try {
    await connectToDatabase();
    const suppliers = await Supplier.find();
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los proveedores', details: error }, { status: 500 });
  }
}
