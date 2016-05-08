const _ = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');

const app = express();
const compiler = webpack(config);

const networks = [
  {
    path: 'eta_3_hidden_5.json',
    hiddenNodes: 5,
    eta: 3.0,
    activation: 'Sigmoid',
    accuracy: '87%'
  },
  {
    path: 'eta_3_hidden_10.json',
    hiddenNodes: 10,
    eta: 3.0,
    activation: 'Sigmoid',
    accuracy: '90%'
  },
  {
    path: 'eta_3_hidden_30.json',
    hiddenNodes: 30,
    eta: 3.0,
    activation: 'Sigmoid',
    accuracy: '94%'
  }
];

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.get('/awesome', (req, res) => {
//   jsonfile.readFile(path.join(__dirname, 'json', 'mnist', 'testing_0-499'), (err, file) => {
//     res.send(file);
//   });
// });

app.get('/network', (req, res) => {
  res.send(networks);
});

app.get('/network/:id', function (req, res) {
  const filename = req.params.id;

  // Make sure this is a valid name hard coded above, do not want to allow any
  // file to be returned with path.join below. Should be done better, but this
  // should be secure for now.
  const isValidPath = _.find(networks, { path: filename });
  if (!isValidPath) {
    return res.status(500).send('Network does not exist');
  }

  jsonfile.readFile(path.join(__dirname, 'json', 'networks', filename), (err, file) => {
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
