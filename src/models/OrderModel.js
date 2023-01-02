const mongoose = require('mongoose');

const ObjectId=mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema( {
   productName:{
     type:String,
     required:true
   },
    price: {
     type:String,
     required:true
}, 
 customerID: {
     type:ObjectId,
      ref:'Customer'
     },
     cardType:{
          type:String
     }
}
   
, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)