const _ = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
const express = require('express');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

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
    path: 'eta_3_hidden_20.json',
    hiddenNodes: 20,
    eta: 3.0,
    activation: 'Sigmoid',
    accuracy: '93%'
  },
  {
    path: 'eta_3_hidden_30.json',
    hiddenNodes: 30,
    eta: 3.0,
    activation: 'Sigmoid',
    accuracy: '94%'
  },
  {
    path: 'eta_.3_hidden_30.json',
    hiddenNodes: 30,
    eta: 0.3,
    activation: 'Sigmoid',
    accuracy: '82%'
  },
  {
    path: 'eta_3_hidden_20_15.json',
    hiddenNodes: '20, 15',
    eta: 3,
    activation: 'Sigmoid',
    accuracy: '93%'
  },
];

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

const port = process.env.PORT || 3000;
app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Node app is running on port', app.get('port'));
});


// app.listen(process.env.PORT || 3000, 'localhost', (err) => {
//
//
//   console.log('Listening at http://localhost:3000');
// });
