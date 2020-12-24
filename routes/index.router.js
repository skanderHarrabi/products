const express = require('express');
const multer = require('multer');
const router = express.Router();
const productsController = require('../controllers/products.controller.js');

router.post('/products', productsController.products);
router.get('/products', productsController.allProducts);
router.get('/product/:id', productsController.product);

module.exports = router;
