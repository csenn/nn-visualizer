const jsonfile = require('jsonfile');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/awesome', (req, res) => {
  jsonfile.readFile(path.join(__dirname, 'json', 'mnist', 'testing_0-499'), (err, file) => {
    res.send(file);
  });
});

app.get('/network', (req, res) => {
  jsonfile.readFile(path.join(__dirname, 'json', 'networks', 'eta_hidden_30.json'), (err, file) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(file);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
