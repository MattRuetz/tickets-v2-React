const path = require('path');
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
    res.status(200).json({ message: 'Support Desk API' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
    );
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Support Desk API' });
    });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server on port ${PORT}`));
