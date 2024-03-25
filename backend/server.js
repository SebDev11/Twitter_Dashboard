const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

//MongoDB Connection
const { ConnectDB } = require("./utils/connection");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes
const ItemRouter = require('./routes/item.routes');
const AuthRouter = require('./routes/auth.routes');

app.use('/api/', ItemRouter);
app.use('/api/auth/', AuthRouter);

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`🚀 :: Server is up and running on PORT: ${PORT}`);
    ConnectDB();
})