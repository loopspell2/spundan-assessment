const express = require("express");
const Menu = require("../models/Menu");

const menuRouter = express.Router();

menuRouter.get("/", async (req, res) => {
  try {
    const data = await Menu.find({userId : req.userId});

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "list is empty",
      });
    }

    return res.status(200).json({
      status: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "internal error",
    });
  }
});

menuRouter.post("/", async (req, res) => {
  try {
    const { categorie, item, isSize, size, isPrice, price } = req.body;

    // console.log(categorie, item, isSize, size, isPrice,price);

    if (!categorie || !item) {
      return res.status(400).json({ message: "categorie or item is missing" });
    }

    if (!isSize && !isPrice) {
      console.log(isSize, price);
      return res.status(400).json({ message: "isSize or price is missing" });
    }

    const newItem = new Menu({
      userId: req.userId,
      categorie,
      item,
      isSize,
      size,
      isPrice,
      price,
    });

    await newItem.save();

    return res.status(200).json({
      status: true,
      message:"Item added successfully",
      data: newItem,
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ status:false, message: 'Duplicate item found, please choose a different item.' });
    }

    return res.status(500).json({
      status: false,
      message: "internal error",
    });
  }
});

menuRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "id missing",
      });
    }

    const done = await Menu.findByIdAndDelete({
      _id: id,
    });

    if (!done) {
      return res.status(400).json({
        status: false,
        message: "item not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "item is removed",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "internal error",
    });
  }
});

menuRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "id missing",
      });
    }

    const { categorie, item, isSize, size, isPrice, price } = req.body;

    if (!categorie || !item) {
      return res.status(400).json({ message: "categorie or item is missing" });
    }

    if (!isSize && !isPrice) {
      console.log(isSize, price);
      return res.status(400).json({ message: "isSize or price is missing" });
    }

    const response = await Menu.findByIdAndUpdate(
      { _id: id },
      {
        userId: req.userId,
        categorie,
        item,
        isSize,
        size,
        isPrice,
        price,
      },
      {new : true}
    );

    if(!response){
        return res.status(400).json({
            status: true,
            message:"item not found"
        })
    }

    return res.status(200).json({
        status: true,
        message:"item update successfully",
        data: response
    })

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ status:false, message: 'Duplicate item found, please choose a different item.' });
    }
    res.status(500).send({ message: 'An error occurred during the update.' });
  }
})

module.exports = menuRouter;
