const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");
const fs = require("fs");
const checkAdmin = require('./config/checkAdmin');
const checkPaySetting = require('./config/checkPaySetting');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable files upload
app.use(fileUpload({ createParentPath: true }));
//add other middleware
app.use(cors());
app.use(morgan("dev"));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/message', require('./routes/api/message'));
app.use('/api/file', require('./routes/api/file'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/payment', require('./routes/api/payment'));
app.use('/api/stripe', require('./routes/api/stripe'));

checkAdmin();
checkPaySetting();

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
