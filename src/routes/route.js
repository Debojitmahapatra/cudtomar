const express = require('express');
const router = express.Router();

const {createCustomer} = require("../controller/customer")
const {createOrder} = require("../controller/order")
const {getCustomar}=require("../controller/admin")

router.get("/customer",getCustomar)
router.post("/customer",createCustomer)
router.post("/order",createOrder)

module.exports = router; 

