const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const app = express();
const conn = require('./dbConnection');
const body = require('body-parser');

app.use(cors())
app.use(body.urlencoded({extended: true}))

//static folder
app.use('/Images', express.static('./Images'))

app.use(express.json());

app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


app.listen(3009,() => console.log('Server is running on port 3009 '));