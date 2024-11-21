import { NextResponse } from 'next/server';
import { getUserByEmail } from '../../server/serverFunctions';

export async function GET(
  req: Request,
  { params }: { params: { email: string } },
) {
  try {
    const { email } = params;
    console.log(email,"EMAIL")
    // Use the server-side function to handle the logic
    const result = await getUserByEmail(email);
    
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