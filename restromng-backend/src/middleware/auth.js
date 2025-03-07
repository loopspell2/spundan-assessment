const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("cookies : ", req.cookies.token);

    // console.log(token)
    if(!token){
        return res.status(400).json({
            status: false,
            message:"token is missing"
        })
    }

    const decode = jwt.verify(token, "secret");

    req.userId = decode.user.id;

    const user = await User.findOne({_id: req.userId});
    // console.log(user);

    if(!user){
        return res.status(400).json({
            status:false,
            message: "user not found"
        })
    }


    next();

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "internal error",
    });
  }
};

module.exports = auth;
