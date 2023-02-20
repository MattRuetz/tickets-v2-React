const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
// dotenv NPM package
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
// imports from the .env file
const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();

const app = express();

// This allows JSON to be posted to the express server
app.use(express.json());
// Express now Includes Body Parser!! The following allows urlencoded Post req.
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello!' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server on port ${PORT}`));
