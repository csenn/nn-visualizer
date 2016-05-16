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
    activation: 'Logistic',
    accuracy: '87%',
    improvedWeightInit: false,
    cost: 'Quadratic'
  },
  {
    path: 'eta_3_hidden_10.json',
    hiddenNodes: 10,
    eta: 3.0,
    activation: 'Logistic',
    accuracy: '90%',
    improvedWeightInit: false,
    cost: 'Quadratic'
  },
  {
    path: 'eta_3_hidden_20.json',
    hiddenNodes: 20,
    eta: 3.0,
    activation: 'Logistic',
    accuracy: '93%',
    improvedWeightInit: false,
    cost: 'Quadratic'
  },
  {
    path: 'eta_3_hidden_30.json',
    hiddenNodes: 30,
    eta: 3.0,
    activation: 'Logistic',
    accuracy: '94%',
    improvedWeightInit: false,
    cost: 'Quadratic'
  },
  {
    path: 'eta_.3_hidden_30.json',
    hiddenNodes: 30,
    eta: 0.3,
    activation: 'Logistic',
    accuracy: '82%',
    improvedWeightInit: false,
    cost: 'Quadratic'
  },
  {
    path: 'eta_.3_hidden_30_improvedWeights.json',
    hiddenNodes: 30,
    eta: 0.3,
    activation: 'Logistic',
    accuracy: '95%',
    improvedWeightInit: true,
    cost: 'Quadratic'
  },
  //running
  {
    path: 'eta_.01_hidden_30_tanh.json',
    hiddenNodes: '30',
    eta: 0.01,
    activation: 'Tanh',
    accuracy: '93%',
    improvedWeightInit: true,
    cost: 'Quadratic'
  },
  {
    path: 'eta_.3_hidden_30_crossEntropy_improvedWeights_tanh.json',
    hiddenNodes: 30,
    eta: 0.03,
    activation: 'Tanh',
    accuracy: '93%',
    improvedWeightInit: true,
    cost: 'Cross Entropy'
  },
  {
    path: 'eta_.1_hidden_5_5_crossEntropy_improvedWeights.json',
    hiddenNodes: '5, 5',
    eta: 0.1,
    activation: 'Logistic',
    accuracy: '88%',
    improvedWeightInit: true,
    cost: 'Cross Entropy'
  },
  // running
  {
    path: 'eta_.1_hidden_20_15_crossEntropy_improvedWeights_tanh.json',
    hiddenNodes: '20, 15',
    eta: 0.1,
    activation: 'Tanh',
    accuracy: '94%',
    improvedWeightInit: true,
    cost: 'Cross Entropy'
  }


  // {
  //   path: 'eta_3_hidden_20_15.json',
  //   hiddenNodes: '20, 15',
  //   eta: 3,
  //   activation: 'Logistic',
  //   accuracy: '93%',
  //   improvedWeightInit: false,
  //   cost: 'Quadratic'
  // }
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

// use this instead.
// app.use('/static', express.static('public'));

app.get('/static/bundle.js', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'bundle.js'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Node app is running on port', port);
});
