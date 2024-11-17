// /app/api/expenses/route.ts
import connectToDatabase from '@/app/lib/mongodb';
import Expense from '@/app/models/Expense';
import { NextResponse } from 'next/server';

// POST: Crear un nuevo egreso
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validar campos obligatorios
    if (!data.store_id || !data.amount || !data.category) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const newExpense = new Expense(data);
    const savedExpense = await newExpense.save();

    return NextResponse.json(savedExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el egreso', details: error }, { status: 500 });
  }
}

// GET: Obtener todos los egresos
export async function GET() {
  try {
    await connectToDatabase();
    const expenses = await Expense.find();
    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los egresos', details: error }, { status: 500 });
  }
}
