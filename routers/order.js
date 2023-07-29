const express = require('express')
const router = express.Router()
const Order = require('../models/ordermodel')
const nodemailer = require('nodemailer')
const verifyUser = require('../middleware/VerifyUser')

//Post Order
router.post('/neworder', async (req, res) => {
    const { name, email, pricing, description, address } = req.body
    if (!name || !email || !pricing || !description || !address) {
        return res.status(400).json({ success: false, message: "Fill the data properly" })
    }
    try {

        const randomNo = 5000 + (9999 - 5000) * Math.random()
        let ID = Math.round(randomNo) + `${Date.now()}`

        const saveorder = new Order({ name, email, pricing, description, address, orderId: ID })
        await saveorder.save();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'threatyour@gmail.com',
                pass: process.env.PASS
            }

        })
        let info = transporter.sendMail({
            from: 'threatyour@gmail.com',
            to: `${email}`,
            subject: 'Your OTP',
            text: `Hello ${name} your order is recieved. Your OrderId is ${ID}. We will send you another email after we analyze your project. Stay Tuned!`
        })
        return res.status(201).json({ success: true, message: "We recieved your order. Please check your email" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Some Error Occured" })
    }
})

//Get Orders
router.get('/admin/getorders',verifyUser, async (req, res) => {

    try {
        const orders = await Order.find().sort({ 'orderedAt': 1 });
        if (orders.length == 0) {
            return res.status(400).json({ success: false, message: "No orders Found" })
        }
        return res.status(200).json({ success: true, message: orders })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Some Error Occured" })
    }
})


//Edit the order
router.patch('/editorder/:id',verifyUser, async(req, res) => {
    const { status } = req.body
    if (!status) {
        return res.status(500).json({ success: false, message: "Fill the data" })
    }
    try {
        await Order.findByIdAndUpdate(req.params.id, status)
        return res.status(200).json({ success: true, message: "Order Updated" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Some error Occured" })
    }
})

module.exports = router