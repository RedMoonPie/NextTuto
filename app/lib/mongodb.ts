// /lib/mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

declare global {
  // Extend the Node.js global object to include a mongoose property
  // This helps in type-checking if you're using TypeScript
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used to maintain a persistent connection during development
 * to avoid multiple reconnections to the database.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
