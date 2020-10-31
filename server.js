const express = require('express');
const router = require('./serve/api');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
const serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`
    Serve is running~
    network: localhost:${port}`);
});
