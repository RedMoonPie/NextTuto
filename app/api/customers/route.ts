// /app/api/customers/route.ts
import connectToDatabase from '@/app/lib/mongodb';
import Customer from '@/app/models/Customer';
import { NextResponse } from 'next/server';

// POST: Crear un nuevo cliente
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validar campos obligatorios
    if (!data.store_id || !data.name || !data.contact) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 },
      );
    }

    const newCustomer = new Customer(data);
    const savedCustomer = await newCustomer.save();

    return NextResponse.json(savedCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el cliente', details: error },
      { status: 500 },
    );
  }
}

// GET: Obtener todos los clientes
export async function GET() {
  try {
    await connectToDatabase();
    const customers = await Customer.find();
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los clientes', details: error },
      { status: 500 },
    );
  }
}
