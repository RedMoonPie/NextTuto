import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Store document
export interface IStore extends Document {
  name: string;
  address: string;
  contact: {
    phone: string;
    email: string;
  };
  inventory_id: mongoose.Types.ObjectId; // Reference to Inventory
  created_at: Date;
  updated_at: Date;
}

// Define the Store schema
const StoreSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  inventory_id: {
    type: Schema.Types.ObjectId,
    ref: 'Inventory', // Link to the inventory collection
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Register the Store model
export default mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);
