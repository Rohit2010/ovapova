const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
}, { timestamps: true }
)

module.exports = mongoose.model("Policy", policySchema)
