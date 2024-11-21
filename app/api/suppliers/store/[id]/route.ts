// /app/api/inventories/[storeId]/route.ts
import { NextResponse } from 'next/server';
import { getSuppliersByStoreId } from '../../server/serverFunctions';

// GET: Obtener proveedores por store_id

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Use the server-side function to handle the logic
    const result = await getSuppliersByStoreId(id);

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