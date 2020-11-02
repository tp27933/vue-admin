const express = require('express');
const router = require('./serve/api');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
const multer = require('multer');
const fs = require('fs');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`
    Serve is running~
    network: localhost:${port}`);
});
