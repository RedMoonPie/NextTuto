import connectToDatabase from '@/app/lib/mongodb';
import Product, { ProductType } from '@/app/models/Product';
// Define the expected shape of the input data
type ProductData = {
  name: string;
  category: string;
  barcode: string;
  price: number;
  final_price:number;
};

export async function getAllProducts() {
  try {
    await connectToDatabase();

    const products: ProductType[] = await Product.find()
    
    return {
      data: products,
      status: 200,
    };
  } catch (error) {
    console.log(error)
    return {
      error: 'Error al obtener los productos',
      details: error,
      status: 500,
    };
  }
}

export async function createProduct(data: ProductData) {
  try {
    await connectToDatabase();

    // Validate required fields
    if (!data.name || !data.category || !data.barcode || !data.price) {
      return {
        error: 'Faltan campos obligatorios',
        status: 400,
      };
    }

    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();

    return {
      data: savedProduct,
      status: 201,
    };
  } catch (error) {
    return {
      error: 'Error al crear el producto',
      details: error,
      status: 500,
    };
  }
}
