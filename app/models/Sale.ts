// /models/Sale.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISale extends Document {
  store_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  customer_id?: mongoose.Types.ObjectId;
  products: {
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    unit_price: number;
  }[];
  total_amount: number;
  payment_method: 'efectivo' | 'tarjeta' | 'crédito';
  invoice_type: 'pos' | 'electrónica' | 'nota débito' | 'nota crédito';
  created_at: Date;
  updated_at: Date;
}

const SaleSchema: Schema = new Schema({
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
      unit_price: { type: Number, required: true },
    },
  ],
  total_amount: { type: Number, required: true },
  payment_method: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'crédito'],
    required: true,
  },
  invoice_type: {
    type: String,
    enum: ['pos', 'electrónica', 'nota débito', 'nota crédito'],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Sale ||
  mongoose.model<ISale>('Sale', SaleSchema);
