// /app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/models/Users';

// GET: Obtener un usuario por ID
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

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el usuario', details: error },
      { status: 500 },
    );
  }
}

// PUT: Actualizar un usuario por ID
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

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el usuario', details: error },
      { status: 500 },
    );
  }
}

// DELETE: Eliminar un usuario por ID
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

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Usuario eliminado exitosamente' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el usuario', details: error },
      { status: 500 },
    );
  }
}
