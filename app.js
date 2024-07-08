const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const { verifyAccessToken } = require('./helpers/jwt_helper');
const productRoutes = require('./Routes/product_route');
const AuthRoute = require('./Routes/auth_route');
const protect = require('./middleware/auth_middleware');
const authorize = require('./middleware/authorize_middleware');

require('dotenv').config();
require('./helpers/init_mongodb');
const client = require('./helpers/init_redis');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public route
app.get('/', async (req, res, next) => {
    res.send('Welcome to my API');
});

// Authentication routes
app.use('/api/auth', AuthRoute);

// Product routes with authentication and authorization middleware
app.use('/api/products', verifyAccessToken, productRoutes);

// Handle 404 errors
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
