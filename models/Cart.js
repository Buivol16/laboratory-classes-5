// models/cart.js

const Product = require('./Product');

class Cart {
    static #items = [];

    static add(product) {
        const cartItem = this.#items.find(item => item.product === product);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            this.#items.push({ product: product, quantity: 1 });
        }
    }

    static getItems() {
        return this.#items;
    }

    static getTotalPrice() {
        return this.#items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }

    static getProductsQuantity() {
        return this.#items.reduce((sum, item) => sum + item.quantity, 0);
    }

    static clearCart() {
        this.#items = [];
    }
}

module.exports = Cart;
