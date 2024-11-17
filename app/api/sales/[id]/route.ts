// /app/api/sales/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Sale from '@/app/models/Sale';

// GET: Obtener una venta por ID
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

    const sale = await Sale.findById(id);
    if (!sale) {
      return NextResponse.json(
        { error: 'Venta no encontrada' },
        { status: 404 },
      );
    }

    return NextResponse.json(sale, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la venta', details: error },
      { status: 500 },
    );
  }
}

// PUT: Actualizar una venta por ID
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

    const updatedSale = await Sale.findByIdAndUpdate(id, data, { new: true });
    if (!updatedSale) {
      return NextResponse.json(
        { error: 'Venta no encontrada' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedSale, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la venta', details: error },
      { status: 500 },
    );
  }
}

// DELETE: Eliminar una venta por ID
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

    const deletedSale = await Sale.findByIdAndDelete(id);
    if (!deletedSale) {
      return NextResponse.json(
        { error: 'Venta no encontrada' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Venta eliminada exitosamente' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la venta', details: error },
      { status: 500 },
    );
  }
}
