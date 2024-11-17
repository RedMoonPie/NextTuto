import mongoose, { Document, Model } from 'mongoose';

/**
 * Utility function to validate that a referenced document exists.
 * @param modelName - The name of the Mongoose model (e.g., 'Store', 'User', 'Product').
 * @param id - The ObjectId of the referenced document.
 * @returns A promise that resolves to true if the document exists, otherwise false.
 */
export const validateReference = async (modelName: string, id: mongoose.Types.ObjectId): Promise<boolean> => {
  // Check if the ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }

  // Get the Mongoose model dynamically
  const model: Model<any> = mongoose.model(modelName);
  const exists = await model.exists({ _id: id });

  // Return true if the document exists, false otherwise
  return exists != null;
};
