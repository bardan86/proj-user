const mongoose = require("mongoose")

async function connectDB(){
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected with ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
    }
    

}
module.exports = connectDB