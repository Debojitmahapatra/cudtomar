const mongoose = require('mongoose');



const customerSchema = new mongoose.Schema( {
    firstName: { type:String, required:true}, 
    lastName: {type:String ,required:true}, 
     emailID: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
   
    orderCount:{
        type:Number,
        default:0
    },
    categorized:{
        type: String,
        default:"reguler"
    },
    cashback:{
        type:Number,
        default:0
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true });


module.exports = mongoose.model('Customer', customerSchema)