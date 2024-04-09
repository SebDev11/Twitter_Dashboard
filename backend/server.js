const express = require("express");
const multer = require('multer');
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

//Multer disk Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/src/uploads/') // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() //creating unique file name in here with adding date and time now
      cb(null, uniqueSuffix + file.originalname)  // Filename in the destination directory
    }
})
  
const upload = multer({ storage: storage })

//routes
const AllRoutes = require('./routes/item.routes');
const AuthRouter = require('./routes/auth.routes');

app.use('/api/', AllRoutes(upload));
app.use('/api/auth/', AuthRouter);

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`🚀 :: Server is up and running on PORT: ${PORT}`);
    ConnectDB();
})