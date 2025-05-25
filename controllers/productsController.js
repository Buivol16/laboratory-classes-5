const Product = require('../models/Product');
const Cart = require('../models/Cart');
const products = require('../models/ProductArray');
const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

exports.getProducts = (req, res) => {
    res.render('products', {
        products,
        headTitle: 'All Products',
        menuLinks: MENU_LINKS,
        activeLinkPath: '/products',
        cartCount: Cart.getProductsQuantity()
    });
};

exports.getAddProduct = (req, res) => {
    res.render('add-product', {
        headTitle: 'Add Products',
        menuLinks: MENU_LINKS,
        activeLinkPath: '/products/add',
        cartCount: Cart.getProductsQuantity()
    });
};


exports.addProduct = (req, res) => {
    const { name, description, price } = req.body;
    const existing = products.find(p => p.name === name);
    if (existing) {
        return res.status(400).send('Product with this name already exists!');
    }
    const newProduct = new Product(name, description, parseFloat(price));
    products.push(newProduct);
    res.redirect('/products');
};

exports.getProductsView = (request, response) => {
  const products = Product.getAll();

  response.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
  });
};

exports.getAddProductView = (request, response) => {
  response.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
};

exports.getNewProductView = (request, response) => {
  const newestProduct = Product.getLast();

  response.render("new-product.ejs", {
    headTitle: "Shop - New product",
    path: "/new",
    activeLinkPath: "/products/new",
    menuLinks: MENU_LINKS,
    newestProduct,
  });
};

exports.getProductView = (request, response) => {
  const name = request.params.name;
  const product = Product.findByName(name);

  response.render("product.ejs", {
    headTitle: "Shop - Product",
    path: `/products/${name}`,
    activeLinkPath: `/products/${name}`,
    menuLinks: MENU_LINKS,
    product,
  });
};

exports.deleteProduct = (request, response) => {
  const name = request.params.name;
  Product.deleteByName(name);

  response.status(STATUS_CODE.OK).json({ success: true });
};
