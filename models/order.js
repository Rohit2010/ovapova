const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type:ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price:Number
})

const OrderSchema = new mongoose.Schema({

    products:[ProductCartSchema],
    trancsaction_id: {
        
    },
    name:{
        type:String,
        required:true
    },
   
    payment:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        trim:true
    },
    address: {
        type:String,
        required:true,
    },
    status: {
        type: String,
        default:"",
        enum: ["Cancelled", "Delivered" , "Shipped" , "Processing", "Recieved"]
    },
    updated: Date,
    user: {
        type:ObjectId,
        ref: "User"
    }
},{ timestamps: true })

const Order = mongoose.model("Order", OrderSchema);
const ProductCart = mongoose.model("Product", ProductCartSchema);

module.exports = {Order,ProductCart}