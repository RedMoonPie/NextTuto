// /app/api/users/route.ts
import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/models/Users';
import Store from '@/app/models/Store';
import bcrypt from 'bcrypt';

import { NextResponse } from 'next/server';

// POST: Crear un nuevo usuario
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Validar datos básicos
    if (!data.store_id || !data.username || !data.password_hash || !data.role) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(data.password_hash, 10);
    const newData = {...data, password_hash: hashedPassword}
    const newUser = new User(newData);
    const savedUser = await newUser.save();

    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el usuario', details: error }, { status: 500 });
  }
}

// GET: Obtener todos los usuarios
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los usuarios', details: error }, { status: 500 });
  }
}
