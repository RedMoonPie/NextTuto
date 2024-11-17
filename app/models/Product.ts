// /models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  barcode: string;
  supplier_id: mongoose.Types.ObjectId;
  price: number;
  statistics: {
    monthly_sales: number;
    annual_sales: number;
  };
  created_at: Date;
  updated_at: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  barcode: { type: String, unique: true, required: true },
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  price: { type: Number, required: true },
  statistics: {
    monthly_sales: { type: Number, default: 0 },
    annual_sales: { type: Number, default: 0 }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
