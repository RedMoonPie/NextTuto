import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Inventory document
export interface IInventory extends Document {
  store_id: mongoose.Types.ObjectId; // Store that owns this inventory
  products: Array<{
    product_id: mongoose.Types.ObjectId;
    stock: number;
  }>;
  created_at: Date;
  updated_at: Date;
}

// Define the Inventory schema
const InventorySchema: Schema = new Schema({
  store_id: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

InventorySchema.index({ store_id: 1 }); // 1 for ascending index

// Register the Inventory model
export default mongoose.models.Inventory ||
  mongoose.model<IInventory>('Inventory', InventorySchema);
