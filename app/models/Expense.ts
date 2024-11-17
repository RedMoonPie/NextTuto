// /models/Expense.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IExpense extends Document {
  store_id: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
}

const ExpenseSchema: Schema = new Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
