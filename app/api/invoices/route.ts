// /app/api/invoices/route.ts
import connectToDatabase from '@/app/lib/mongodb';
import Invoice from '@/app/models/Invoice';
import { NextResponse } from 'next/server';
// POST: Crear una nueva factura
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validar campos obligatorios
    if (!data.store_id || !data.sale_id || !data.invoice_type || !data.status) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const newInvoice = new Invoice(data);
    const savedInvoice = await newInvoice.save();

    return NextResponse.json(savedInvoice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear la factura', details: error }, { status: 500 });
  }
}

// GET: Obtener todas las facturas
export async function GET() {
  try {
    await connectToDatabase();
    const invoices = await Invoice.find();
    return NextResponse.json(invoices, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las facturas', details: error }, { status: 500 });
  }
}
