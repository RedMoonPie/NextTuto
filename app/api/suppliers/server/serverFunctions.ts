import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Supplier from '@/app/models/Supplier';

// Server-side function to get suppliers by store_id
export async function getSuppliersByStoreId(storeId: string) {
  try {
    await connectToDatabase();

    // Validate if storeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return {
        error: 'store_id no válido',
        status: 400,
      };
    }

    // Retrieve the suppliers for the given storeId
    const suppliers = await Supplier.find({ store_id: storeId });

    // Check if any suppliers were found for this store
    if (!suppliers || suppliers.length === 0) {
      return {
        error: 'Inventario no encontrado para esta tienda',
        status: 404,
      };
    }

    return {
      data: suppliers,
      status: 200,
    };
  } catch (error) {
    return {
      error: 'Error al obtener los proveedores',
      details: error,
      status: 500,
    };
  }
}
