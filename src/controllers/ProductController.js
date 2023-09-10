const ProductSevice = require('../services/ProductService');
const JwtService = require('../services/JwtService');


const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "ERR",
                message: "Invalid input require"
            })
        }
        const response = await ProductSevice.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "ProductId is required"
            })
        }
        const response = await ProductSevice.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "ProductId is required"
            })
        }
        const response = await ProductSevice.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: "ERR",
                message: "Ids is required"
            })
        }
        const response = await ProductSevice.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const DetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "ProductId is required"
            })
        }
        const response = await ProductSevice.DetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const allProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductSevice.allProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ProductSevice.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    DetailsProduct,
    allProduct,
    deleteMany,
    getAllType
}