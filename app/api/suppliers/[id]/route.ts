// /app/api/suppliers/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Supplier from '@/app/models/Supplier';

// GET: Obtener un proveedor por ID
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

    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return NextResponse.json(
        { error: 'Proveedor no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(supplier, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el proveedor', details: error },
      { status: 500 },
    );
  }
}

// PUT: Actualizar un proveedor por ID
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

    const updatedSupplier = await Supplier.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedSupplier) {
      return NextResponse.json(
        { error: 'Proveedor no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedSupplier, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el proveedor', details: error },
      { status: 500 },
    );
  }
}

// DELETE: Eliminar un proveedor por ID
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

    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
      return NextResponse.json(
        { error: 'Proveedor no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Proveedor eliminado exitosamente' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el proveedor', details: error },
      { status: 500 },
    );
  }
}
