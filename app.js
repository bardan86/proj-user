const express = require("express")
const connectDB = require(".//config/connDB")
const dotenv = require("dotenv")
const morgan = require("morgan")
const {notFound,errorhandler}= require(".//middleware/errors")


// load config
dotenv.config({path:"./config/.env"})

const app = express()

// connet DB
connectDB()

// loging use morgan to see http and method in console
if(process.env.NODE_ENV ==="development"){
    app.use(morgan("dev"))
}

// apply middlewares
app.use(express.json()) 

// Routes

app.use("/" , require("./routes/user"))
app.use("/" , require("./routes/auth"))



// error link middleware hanlder
app.use(notFound)

//error Handler middleware
app.use(errorhandler)

const PORT = process.env.PORT || 5000
app.listen(PORT ,()=>
console.log(`server is running in ${process.env.NODE_ENV} mode , on Port ${PORT}`))
