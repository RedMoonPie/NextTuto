// /models/Supplier.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISupplier extends Document {
  store_id: mongoose.Types.ObjectId;
  name: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  created_at: Date;
  updated_at: Date;
}

const SupplierSchema: Schema = new Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  name: { type: String, required: true },
  contact: {
    phone: { type: String },
    email: { type: String },
    address: { type: String }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.models.Supplier || mongoose.model<ISupplier>('Supplier', SupplierSchema);
