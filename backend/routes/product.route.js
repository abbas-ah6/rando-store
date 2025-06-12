const exporess = require('express');
const productController = require('../controllers/product.controller');

const router = exporess.Router();

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct)

router
    .route('/:id')
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    .put(productController.updateProductById)

module.exports = router;