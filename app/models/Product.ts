// /models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  barcode: string;
  sku?: string;
  supplier_id: mongoose.Types.ObjectId;
  price: number;
  final_price: number;
  statistics: {
    monthly_sales: number;
    annual_sales: number;
  };
  created_at: Date;
  updated_at: Date;
}
export type ProductType = {
  _id: string;
  name: string;
  category: string;
  description: string;
  barcode: string;
  sku?: string;
  supplier_id: string;
  price: number;
  final_price: number;
  statistics: {
    monthly_sales: number;
    annual_sales: number;
  };
  created_at: string;
  updated_at: string;
};

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  barcode: { type: String, unique: true, required: true },
  sku: { type: String, unique: true, required: false },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  price: { type: Number, required: true },
  final_price: { type: Number, required: true },
  statistics: {
    monthly_sales: { type: Number, default: 0 },
    annual_sales: { type: Number, default: 0 },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
