const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(authJwt);
app.use('public/uploads', express.static(__dirname + 'public/uploads'));
app.use(errorHandler);

// routes
const productsRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`, orderRoutes);


// Databse connection
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