import mongoose from 'mongoose'

const mongodbUrl = "mongodb://localhost:27017/"
const dbName = "techDb"

export const dbConnect = async () => {
  try {
    await mongoose.connect(`${mongodbUrl}${dbName}`)
    console.log("\x1b[32m", '[DB] Connect success')
  } catch (error) {
    console.log("\x1b[31m", '[DB] Connect error')
  }
}
