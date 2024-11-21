// /app/api/products/route.ts

import { NextResponse } from 'next/server';
import { createProduct, getAllProducts } from './server/serverFunctions';

// POST: Crear un nuevo producto
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await createProduct(data);

    if (result.error) {
      return NextResponse.json({ error: result.error, details: result.details }, { status: result.status });
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error inesperado en el servidor', details: error },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const result = await getAllProducts();

    if (result.error) {
      return NextResponse.json({ error: result.error, details: result.details }, { status: result.status });
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error inesperado en el servidor', details: error },
      { status: 500 },
    );
  }
}
