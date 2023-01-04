const CustomerModel =require( "../models/CustomerModel")
const valid =require("../middlewares/Validation")

module.exports.getCustomar=async function(req,res){
   
    try { 
        let queryData=req.query
        let {categorized}=queryData
        
        let obj={isDeleted:false}
        if(categorized){
        let check3 = ["reguler","gold","platinum"]
        let checkEnum = await check3.find(element => element==categorized)
          if(!checkEnum){return  res.status(400).send({status: false, msg : "Enter your categorized from this Only[reguler,gold,platinum] "})} 
             obj.categorized=categorized
        }
          let data = await CustomerModel.find(obj)
        
          if (data.length > 0)
            {return res.status(200).send({ status: true, data: data })}
        else
            {return res.status(404).send({ status: false, msg: "No data found" })}
  
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
module.exports.getCashback=async function(req,res){
    try{
    let data=req.params
    let customerId = req.params.customerId
    customerId = customerId.trim()
    const checkUser = await CustomerModel.findById(customerId)

    if (!checkUser) return res.status(404).send({ status: false, message: "No user found" })
 


    return res.status(200).send({ status: true, message: 'Users cashback', data: checkUser.cashback });

    }catch(err){
        res.status(500).send({ error: err.message })
    }
}