const orderModel =require( "../models/orderModel");
const CustomerModel =require( "../models/CustomerModel")
const valid =require("../middlewares/Validation")

module.exports.createOrder=async function(req,res){
  try{
    let data = req.body
    if (!valid.isValidRequestBody(data)) { return res.status(400).send({ status: false, message: "Please enter details in the request " }) }
    let {productName,price,customerID,cardType}=data
   
    if (!valid.isValid(customerID)) {
        return res.status(400).send({ status: false, message: "Please enter a customerID" })
      }
      if (!valid.isValidObjectId(customerID)) {
        return res.status(400).send({ status: false, message: "Please enter a valid customerID" })
      }
      const isUniqueCustomerID= await CustomerModel.findOne({ customerID: customerID });
      if (!isUniqueCustomerID) { return res.status(400).send({ status: false, message: "Please enter a real Customer" }) }

    if (!valid.isValid(productName)) {
        return res.status(400).send({ status: false, message: "Please enter a valid productName" })
      }

      //price
      if (!valid.isValid(price)) {
        return res.status(400).send({ status: false, message: "Please enter a price" })
      }
      let checkCustomer=await CustomerModel.findById(customerID)
    
      let currPrice
      if(checkCustomer.categorized=="gold"){
        currPrice=(price-(price*10/100))
      }else if(checkCustomer.categorized=="platinum"){
        currPrice=(price-(price*20/100))
      }else{
        currPrice=price
      }
      
      let finelresult={productName,price:currPrice,customerID,cardType:checkCustomer.categorized}
      let savedData = await orderModel.create(finelresult)

      await CustomerModel.findByIdAndUpdate({_id:customerID},{$inc:{orderCount:1}})
      if(checkCustomer.orderCount>=10&&checkCustomer.orderCount<20){
        await CustomerModel.findByIdAndUpdate({_id:customerID},{$set:{categorized:"gold"}})
        
      }else if(checkCustomer.orderCount>=20){
        await CustomerModel.findByIdAndUpdate({_id:customerID},{$set:{categorized:"platinum"}})
      }
       res.status(201).send({ status: true, data: savedData })
      }
      catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
      }
}