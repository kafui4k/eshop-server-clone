const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

require('dotenv/config');

const api = process.env.API_URL;

app.get(`${api}/products`, async (req, res) => {
    const productsList = await Product.find();
    res.send(productsList);
});

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct);
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

// connection
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connection ready...');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log(api);
    console.log('server is running on http://localhost:3000');
});