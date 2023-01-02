const express = require('express');
const router = express.Router();

const {createCustomer,getCustomar} = require("../controller/customer")
const {createOrder} = require("../controller/order")

router.get("/customer",getCustomar)
router.post("/customer",createCustomer)
router.post("/order",createOrder)

module.exports = router; 

