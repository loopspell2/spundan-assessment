const express = require("express");
const User  = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post('/signup', async(req, res) => {
    
    try {
        const { name, username, password } = req.body;

        if(!name || !username || !password){
            return res.status(400).json({
                status: false,
                message: "fields are missing"
            });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                status: false,
                message:"User already exists"
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            username,
            password: hashedPassword
        });

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id
            }
        };

        await jwt.sign(payload, "secret", { expiresIn: 3600 * 24}, (err, token) => {
            if (err) throw err;
            return res.status(201).cookie('token', token, { lax: true }).json({ 
                status: true,
                message:"user registered successfully"
             });
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status:false,
            message:"internal error"
        })
    }
})

authRouter.post('/signin', async(req, res) => {
    
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                status:false,
                message:"User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status:false,
                message:"invaild password"
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, "secret", { expiresIn: 3600 * 24 }, (err, token) => {
            if (err) throw err;
            return res.status(201).cookie('token', token, { lax: true }).json({ 
                status : true,
                message: "login successfully",
                token 
            });
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status:false,
            message:"internal error"
        })
    }

})

module.exports = authRouter;