const express = require('express');

const productsController = require("../controllers/productsController");
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/add', productsController.getAddProduct);
router.post('/add', productsController.addProduct);
router.post('/cart/add', cartController.addProductToCart);

module.exports = router;
