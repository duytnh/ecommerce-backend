const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount, sold } = newProduct
        try {
            const checkProduct = await Product.findOne({ name: name })
            if (checkProduct != null) {
                resolve({
                    status: 'ERR',
                    message: 'Name of product is already'
                })
            } else {
                const createdProduct = await Product.create({
                    name, image, type,
                    price, countInStock,
                    rating, description, discount, sold
                })
                if (createdProduct) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createdProduct
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id)
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'Product is not exists'
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id)
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'Product is not exists'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const DetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(id)
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'Product is not exists'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const allProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allPro = []
            if (filter) {
                const label = filter[0];
                const objectFilter = {}
                objectFilter[filter[0]] = filter[1]
                const allProFilter = await Product.find({
                    [label]: { '$regex': filter[1] }
                })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProFilter,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (limit)
                allPro = await Product.find().limit(limit).skip(limit * page).sort({ name: sort })
            else
                allPro = await Product.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allPro,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allType
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    DetailsProduct,
    allProduct,
    deleteManyProduct,
    getAllType
}