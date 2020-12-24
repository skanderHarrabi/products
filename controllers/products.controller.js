const mongoose = require('mongoose');
const Products = mongoose.model('Products');
const axios = require('axios');
var ObjectId = require('mongoose').Types.ObjectId;



module.exports.products = async (req, res, next) => {
    const { data } = await axios.get('http://test.ats-digital.com:3000/products?size=100');
    data.data.products.map(p => {
        new Products(p).save();
    })
    console.log(data);
    res.json({ message: "success" });
}
module.exports.allProducts = async (req, res, next) => {
    const prods = await Products.find();
    res.json(prods);
}
module.exports.product = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({ message: `No record with given id : ${req.params.id}` });
    const prod = await Products.findById(req.params.id);
    res.json(prod);
}







