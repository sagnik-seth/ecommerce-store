require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors")

// imported routes from files
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")

//DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED")
})

//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)

//Port no
const port = process.env.Port || 8000

//Starting server
app.listen(port, () => {
    console.log(`app is runing at ${port}`);
})