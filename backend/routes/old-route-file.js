var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../init_data.json");
var items = require('../init_data.json').data;
var curId = _.size(items);

/* GET items listing. */
router.get('/', function (req, res) {
    res.json(_.toArray(items));
});

/* Create a new item */
router.post('/', function (req, res) {
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
});

/* Get a specific item by id */
router.get('/:id', function (req, res, next) {
    var item = items[req.params.id];
    if (!item) {
        return next();
    }
    res.json(items[req.params.id]);
});

/* Delete a item by id */
router.delete('/:id', function (req, res) {
    var item = items[req.params.id];
    delete items[req.params.id];
    res.status(204);
    log.info('Deleted item', item);
    res.json(item);
});

/* Update a item by id */
router.put('/:id', function (req, res, next) {
    var item = req.body;
    if (item.id != req.params.id) {
        return next(new Error('ID paramter does not match body'));
    }
    items[item.id] = item;
    log.info('Updating item', item);
    res.json(item);
});


module.exports = router;
