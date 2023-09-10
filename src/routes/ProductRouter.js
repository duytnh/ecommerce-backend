const express = require("express");
const router = express.Router();
const productConttroller = require('../controllers/ProductController')
const { authMiddleware } = require("../Middleware/authMiddleware");

router.post('/create', productConttroller.createProduct)
router.put('/update/:id', authMiddleware, productConttroller.updateProduct)
router.delete('/delete/:id', authMiddleware, productConttroller.deleteProduct)
router.get('/details/:id', productConttroller.DetailsProduct)
router.get('/all', productConttroller.allProduct)
router.post('/delete-many', authMiddleware, productConttroller.deleteMany)
router.get('/all-type', productConttroller.getAllType)

module.exports = router