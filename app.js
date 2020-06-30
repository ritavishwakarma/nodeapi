const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config()

//db connection
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true,
    useNewUrlParser: true, useFindAndModify: false})
    .then(()=>console.log('db connected'));
mongoose.connection.on('error', err=> {
    console.log(`db connection error: ${err.mongoose}`)
});
const app = express()
//bring in routes
const postRoutes = require('./routes/post')

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/",postRoutes );

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log("rita node js api listing on port ", `${port}`));