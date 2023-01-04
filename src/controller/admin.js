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
// module.exports.getCashback=async function(req,res){
//     try{
    

//     }catch(err){
//         res.status(500).send({ error: err.message })
//     }
// }