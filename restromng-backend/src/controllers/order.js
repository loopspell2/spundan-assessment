const express = require("express");
const Order = require("../models/order");
const generatePDF = require("../helper/generatePDF");

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  const { items } = req.body;

//   console.log(items)

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      status: false,
      message: "items array is required",
    });
  }

  try {

    let total = 0;
    items.forEach((item) => {
      if (!item.item || !item.type || !item.cost || !item.quantity) {
        return res.status(400).json({
          status: false,
          message: "Each item must have item, type, cost, and quantity",
        });
      }
      total += item.cost * item.quantity;
    });

    const gstRate = 0.18;
    const restaurantChargeRate = 0.05;

    const gstAmount = total * gstRate;
    const restaurantCharge = total * restaurantChargeRate;

    const finalTotal = (total + gstAmount + restaurantCharge).toFixed(2);

    const order = new Order({
        userId: req.userId,
        items,
        total,
        gst: gstAmount,
        restaurantCharge,
        finalTotal,
    });

    await order.save();
    // console.log(order)
    // console.log("here")

    const filePath = await generatePDF(order);
    // console.log("file : ",filePath);

    res.setHeader('Content-Disposition', `attachment;`);
   

    res.status(200).sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error while sending the file.');
        }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        status:false,
        message:"internal error"
    })
  }
});

module.exports = orderRouter;
