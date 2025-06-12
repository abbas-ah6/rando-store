const express = require('express');
const router = express.Router();
const _ = require('lodash');
const logger = require('../lib/logger');
const log = logger();

const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../init_data.json");
const items = require('../init_data.json').data;
const curId = _.size(items);

/* GET items listing. */
exports.getAllProducts = (req, res) => {
    res.json(_.toArray(items));
}

/* Create a new item */
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
            return res.status(500).json({ message: "Failed to save item" });
        }

        log.info('Created item', item);
        res.json(item);
    });
}

/* Get a specific item by id */
exports.getProductById = (req, res, next) => {
    const item = items[req.params.id];
    if (!item) {
        return next();
    }
    res.json(items[req.params.id]);
}

/* Delete a item by id */
exports.deleteProductById = (req, res, next) => {
    const item = items[req.params.id];
    delete items[req.params.id];
    res.status(204);
    log.info('Deleted item', item);
    res.json(item);
}

/* Update a item by id */
exports.updateProductById = (req, res, next) => {
    const item = req.body;
    if (item.id != req.params.id) {
        return next(new Error('ID paramter does not match body'));
    }
    items[item.id] = item;
    log.info('Updating item', item);
    res.json(item);
}