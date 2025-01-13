const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const fetchuser = require('./middleware/fetchuser');

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/menuRoutes'))
app.use('/', fetchuser, require('./routes/orderRoutes'))


app.listen(port, (error) => {
    if (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    } else {
        console.log(`Server listening on port: ${port}`);
    }
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});
