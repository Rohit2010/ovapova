require("dotenv").config();

const express = require("express");
require("dotenv").config();
const app = express();
const Policy = require("./models/policy")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
//my routes
const authRoutes= require("./routes/auth")
const userRoutes= require("./routes/user")
const categoryRoutes= require("./routes/category")
const productRoutes= require("./routes/product")
const orderRoutes= require("./routes/order")


//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex:true
}).then(()=> {
    console.log("DB CONNECTED")
}).catch((err)=> {console.log(err)})


//middleware
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors())

//my routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)

app.post("/saveuser" , (req,res) => {
    const policy = new Policy(req.body);
    policy.save().then(policy => {
        res.json({
            msg:"data uploaded successfully",
            data:policy
        })
    })
    .catch(err => {
        res.json({
            msg:err,
        })
    })
})
//port
const port = process.env.PORT || 9000;
app.listen(port , ()=>{
    console.log(`app is running at ${port}`)
})
