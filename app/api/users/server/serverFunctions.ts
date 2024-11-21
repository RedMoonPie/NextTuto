import connectToDatabase from '@/app/lib/mongodb';
import mongoose from 'mongoose';
import User, { UserType } from '@/app/models/Users';

export async function getUserByEmail(email: string) {
  try {
    await connectToDatabase();

    // Validate if the provided email is a valid email format (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        error: 'Email no válido',
        status: 400,
      };
    }

    // Use findOne to retrieve user by email
    const user = await User.findOne({ email });

    if (!user) {
      return {
        error: 'Usuario no encontrado',
        status: 404,
      };
    }

    return {
      data: user,
      status: 200,
    };
  } catch (error) {
    return {
      error: 'Error al obtener el usuario',
      details: error,
      status: 500,
    };
  }
}

export async function getUserById(id: string) {
  try {
    await connectToDatabase();

    const user: UserType | null = await User.findById(id);

    if (!user) {
      return {
        error: 'Usuario no encontrado',
        status: 404,
      };
    }

    return {
      data: user,
      status: 200,
    };
  } catch (error) {
    return {
      error: 'Error al obtener el usuario',
      details: error,
      status: 500,
    };
  }
}
