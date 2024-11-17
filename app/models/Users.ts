// /models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import { validateReference } from './utils/referenceValidator';
import '@/app/models/Store';

interface IUser extends Document {
  store_id: mongoose.Types.ObjectId;
  username: string;
  password_hash: string;
  role: string;
  permissions: string[];
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema({
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'cashier'], required: true },
  permissions: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Pre-save hook to validate references
UserSchema.pre<IUser>('save', async function (next: any) {
  try {
    // Validate the store_id reference
    const storeValid = await validateReference('Store', this.store_id);

    if (!storeValid) {
      throw new Error('Invalid store_id: Store does not exist.');
    }

    next();
  } catch (error) {
    console.log(error, 'GG');
    next(error);
  }
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
