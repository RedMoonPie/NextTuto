// /app/api/inventory/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/app/lib/mongodb';
import Inventory from '@/app/models/Inventory';
import Product from '@/app/models/Product';

// POST: Agregar productos al inventario
export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const productsToAdd = await req.json(); // Expecting an array of product updates

    await connectToDatabase();

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID de inventario no válido' },
        { status: 400 },
      );
    }

    // Find the inventory by id
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json(
        { error: 'Inventario no encontrado' },
        { status: 404 },
      );
    }

    const updatedProducts = [];

    for (const { productId, stock } of productsToAdd) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return NextResponse.json(
          { error: `ID de producto no válido: ${productId}` },
          { status: 400 },
        );
      }

      // Find the product by productId
      const product = await Product.findById(productId);

      if (product) {
        // Product exists, update the stock in the inventory
        const existingProductInInventory = inventory.products.find(
          (prod: any) => prod.product_id.toString() === productId,
        );

        if (existingProductInInventory) {
          // Product exists in inventory, update the stock
          existingProductInInventory.stock += stock; // Add stock to existing stock
        } else {
          inventory.products.push({
            product_id: productId,
            stock,
          });
        }

        updatedProducts.push({ productId, stock });
      } else {
        // If product doesn't exist in the Product collection
        return NextResponse.json(
          {
            error: `Producto con ID ${productId} no encontrado en el catálogo`,
          },
          { status: 404 },
        );
      }
    }

    // Save the updated inventory
    await inventory.save();

    return NextResponse.json(
      {
        message:
          'Productos añadidos o actualizados en el inventario exitosamente',
        updatedProducts,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al agregar productos al inventario', details: error },
      { status: 500 },
    );
  }
}

// GET: Obtener un inventario por ID
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

    const inventory = await Inventory.findById(id).populate(
      'products.product_id',
    );
    if (!inventory) {
      return NextResponse.json(
        { error: 'Inventario no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el inventario', details: error },
      { status: 500 },
    );
  }
}

// PUT: Actualizar un inventario por ID
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

    // Validate products against the Product collection
    const productIds = data.products.map((p: any) => p.product_id);
    const existingProducts = await Product.find({ _id: { $in: productIds } });
    if (existingProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Uno o más productos no existen' },
        { status: 400 },
      );
    }

    const updatedInventory = await Inventory.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedInventory) {
      return NextResponse.json(
        { error: 'Inventario no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedInventory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el inventario', details: error },
      { status: 500 },
    );
  }
}

// DELETE: Eliminar un inventario por ID
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

    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return NextResponse.json(
        { error: 'Inventario no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Inventario eliminado exitosamente' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el inventario', details: error },
      { status: 500 },
    );
  }
}
