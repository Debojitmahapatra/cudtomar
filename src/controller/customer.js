const CustomerModel =require( "../models/CustomerModel")
const valid =require("../middlewares/Validation")

module.exports.createCustomer=async function(req,res){
   try{
    let data = req.body
    if (!valid.isValidRequestBody(data)) { return res.status(400).send({ status: false, message: "Please enter details in the request " }) }
    let {firstName, lastName,emailID, orderCount, categorized} = data

    //firstName
    if (!valid.isValid(firstName)) {
      return res.status(400).send({ status: false, message: "Please enter a valid firstName" })
    }
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      return res.status(400).send({ status: false, message: "firstName should alpha characters" })
    };

    //lastname
    if (!valid.isValid(lastName)) {
      return res.status(400).send({ status: false, message: "Please enter a valid lastName" })
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      return res.status(400).send({ status: false, message: "lastName should alpha characters" })
    }

    //emailId
    if (!valid.isValid(emailID)) {
        return res.status(400).send({ status: false, message: "Please enter a valid emailID" })
      }
      if (!(emailID.trim()).match(/^[a-zA-Z_\.\-0-9]+[@][a-z]{3,6}[.][a-z]{2,4}$/)) { return res.status(400).send({ status: false, message: 'invalid E-mail' }) };
      //emailID unique check ---
      const isUniqueemailID = await CustomerModel.findOne({ emailID: emailID });
      if (isUniqueemailID) { return res.status(400).send({ status: false, message: "Please enter a unique emailID" }) }
      //emailID regex check ---
  
     
     
      let finelresult={
        firstName, lastName,emailID, orderCount, categorized}
      let savedData = await CustomerModel.create(finelresult)
        res.status(201).send({ status: true, data: savedData })
      }
      catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
      }

}


