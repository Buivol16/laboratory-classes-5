const Cart = require('../models/Cart');
const products = require('../models/ProductArray');

exports.addProductToCart = (req, res) => {
    const { productName } = req.body;
    const product = products.find(p => p.name === productName);
    if (!product) {
        return res.status(400).send('Product does not exist!');
    }
    Cart.add(product);
    res.redirect('/products');
};

exports.getProductsCount = (req, res) => {
    res.json({ count: Cart.getProductsQuantity() });
};