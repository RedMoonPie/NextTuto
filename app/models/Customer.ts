// /models/Customer.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ICustomer extends Document {
  store_id: mongoose.Types.ObjectId;
  name: string;
  contact: {
    phone: string;
    email: string;
  };
  credit_account: {
    enabled: boolean;
    credit_limit: number;
    current_balance: number;
  };
  created_at: Date;
  updated_at: Date;
}

const CustomerSchema: Schema = new Schema({
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  name: { type: String, required: true },
  contact: {
    phone: { type: String },
    email: { type: String },
  },
  credit_account: {
    enabled: { type: Boolean, default: false },
    credit_limit: { type: Number, default: 0 },
    current_balance: { type: Number, default: 0 },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Customer ||
  mongoose.model<ICustomer>('Customer', CustomerSchema);
