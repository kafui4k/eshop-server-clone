const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');

router.get('/', async (req, res) => {
    const productsList = await Product.find().populate('category');

    if (!productsList) {
        res.status(500).json({
            success:false
        })
    }
    res.status(200).send(productsList);
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        res.status(500).json({
            success:false
        })
    }
    res.status(200).send(product);
})

router.post('/', async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Inalid Category');
    
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    product = await product.save();

    if (!product) {
        return res.status(500).send('Product cannot be Created')
    }

    res.status(200).send(product);
})

router.put('/:id', async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Inalid Category');

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        {
            new: true
        }
    )

    if (!product) {
        return res.status(400).send('product cannot be updated')
    }

    res.status(200).send(product);
})

module.exports = router;
