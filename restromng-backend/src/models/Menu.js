const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    categorie : {
        type : String,
        required : true
    },
    item:{
        type: String,
        required: true,
        unique:true,
    },
    isSize:{
        type: Boolean,
        default:false,
    },
    size: {
        small:{
            type: Number
        },
        larger:{
            type:Number
        }
    },
    isPrice:{
        type:Boolean,
        default:false,
    },
    price: {
        type: Number
    }
})

const Menu = mongoose.model('Menu',menuSchema)

module.exports = Menu;