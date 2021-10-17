const mongoose = require('mongoose');

// schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    },
});

// model
exports.Product = mongoose.model('Product', productSchema);
