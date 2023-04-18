import mongoose from 'mongoose'

export const connectDB = async (uri) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    await mongoose.connect(uri,options)
    console.log("You just connected to mongoDB")
}