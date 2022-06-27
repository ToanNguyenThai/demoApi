const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const authorRoute = require('./routes/author')
const bookRoute = require('./routes/book')
const authRoute = require('./routes/auth')
const PORT = 5000
dotenv.config();
/* connect database */
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, () => {
    console.log("Database connected");
})

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'))

/* Routes: */
app.use("/api/author", authorRoute)
app.use("/api/book", bookRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


