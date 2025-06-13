const exporess = require('express');
const productController = require('../controllers/product.controller');

const router = exporess.Router();

// @GET @POST Products
// Public can be accessed publically
// Route: /api/products
router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct)

// @GET @DELETE @PUT Products
// Public can be accessed publically
// Route: /api/products/:id
router
    .route('/:id')
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    .put(productController.updateProductById)

router
    .route('/search')
    .get(productController.searchProducts)

module.exports = router;