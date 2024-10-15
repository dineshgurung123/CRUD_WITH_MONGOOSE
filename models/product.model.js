const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema(
    {


        name: {
            type: String,
            required: [true, "please enter product name"],
        },

        quantity: {

            type: Number,
            required: true,
            default: 0
        },

        price: {

            type: Number,
            default: 0

        },

        image: {
            type: String,
            required: false

        },



    }

);
  
 const  Product = mongoose.model("Product", ProductSchema);

 module.exports = Product