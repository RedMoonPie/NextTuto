// /models/Invoice.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IInvoice extends Document {
  store_id: mongoose.Types.ObjectId;
  sale_id: mongoose.Types.ObjectId;
  invoice_type: 'pos' | 'electrónica' | 'nota débito' | 'nota crédito';
  status: 'paid' | 'unpaid' | 'credited' | 'debited';
  created_at: Date;
  updated_at: Date;
}

const InvoiceSchema: Schema = new Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
  invoice_type: {
    type: String,
    enum: ['pos', 'electrónica', 'nota débito', 'nota crédito'],
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid', 'credited', 'debited'],
    required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', InvoiceSchema);
