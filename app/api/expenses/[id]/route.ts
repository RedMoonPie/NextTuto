// /app/api/expenses/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Expense from '@/app/models/Expense';

// GET: Obtener un egreso por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    const expense = await Expense.findById(id);
    if (!expense) {
      return NextResponse.json({ error: 'Egreso no encontrado' }, { status: 404 });
    }

    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el egreso', details: error }, { status: 500 });
  }
}

// PUT: Actualizar un egreso por ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const data = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, data, { new: true });
    if (!updatedExpense) {
      return NextResponse.json({ error: 'Egreso no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar el egreso', details: error }, { status: 500 });
  }
}

// DELETE: Eliminar un egreso por ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return NextResponse.json({ error: 'Egreso no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Egreso eliminado exitosamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar el egreso', details: error }, { status: 500 });
  }
}
