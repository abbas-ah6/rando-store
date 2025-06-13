const _ = require('lodash');
const logger = require('../lib/logger');
const log = logger();

const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../init_data.json");
const items = require('../init_data.json').data;

/* GET Products listing. */
exports.getAllProducts = (req, res) => {
    res.json(_.toArray(items));
}

/* Create a new Product */
exports.createNewProduct = (req, res) => {
    const item = req.body;
    let curId = Math.max(...Object.keys(items).map(id => parseInt(id)));

    curId += 1;
    item.id = curId;
    items[item.id] = item;

    const newData = { data: items };
    fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error("Failed to write file:", err);
            return res.status(500).json({ message: "Failed to save product" });
        }

        log.info('Created Product', item);
        res.json(item);
    });
}

/* Get a specific Product by id */
exports.getProductById = (req, res, next) => {
    const item = items[req.params.id];
    if (!item) {
        return next();
    }
    res.json(items[req.params.id]);
}

/* Delete a Product by id */
exports.deleteProductById = (req, res, next) => {
    const item = items[req.params.id];
    delete items[req.params.id];
    res.status(204);
    log.info('Deleted item', item);
    res.json(item);
}

/* Update a Product by id */
exports.updateProductById = (req, res, next) => {
    const item = req.body;
    if (item.id != req.params.id) {
        return next(new Error('ID paramter does not match body'));
    }
    items[item.id] = item;
    log.info('Updating item', item);
    res.json(item);
}

/* Search Product by name */
exports.searchProducts = (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res
            .status(400)
            .json({ error: true, message: "Search query is required!", })
    }

    try {
        const allProducts = Object.values(items);
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().trim().includes(query.toLowerCase().trim())
        );

        return res
            .status(200)
            .json(filteredProducts)

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error", })
    }
}