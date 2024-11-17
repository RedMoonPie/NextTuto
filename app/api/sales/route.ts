// /app/api/sales/route.ts
import connectToDatabase from '@/app/lib/mongodb';
import Sale from '@/app/models/Sale';
import { NextResponse } from 'next/server';

// POST: Crear una nueva venta
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validar campos obligatorios
    if (
      !data.store_id ||
      !data.user_id ||
      !data.products ||
      !data.total_amount ||
      !data.payment_method ||
      !data.invoice_type
    ) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 },
      );
    }

    const newSale = new Sale(data);
    const savedSale = await newSale.save();

    return NextResponse.json(savedSale, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la venta', details: error },
      { status: 500 },
    );
  }
}

// GET: Obtener todas las ventas
export async function GET() {
  try {
    await connectToDatabase();
    const sales = await Sale.find();
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las ventas', details: error },
      { status: 500 },
    );
  }
}
