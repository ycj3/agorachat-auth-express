import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

mongoose.set('strictQuery', false)
const mongoServer = await MongoMemoryServer.create();

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    cached.promise = mongoose.connect(mongoServer.getUri(), opts, err => {
       if (err) {
        console.error(err);
        }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect