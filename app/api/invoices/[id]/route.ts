// /app/api/invoices/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Invoice from '@/app/models/Invoice';

// GET: Obtener una factura por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    return NextResponse.json(invoice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener la factura', details: error }, { status: 500 });
  }
}

// PUT: Actualizar una factura por ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const data = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, data, { new: true });
    if (!updatedInvoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar la factura', details: error }, { status: 500 });
  }
}

// DELETE: Eliminar una factura por ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Factura eliminada exitosamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la factura', details: error }, { status: 500 });
  }
}
