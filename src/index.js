import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './data/store';
import { Root } from './main/Root';

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
