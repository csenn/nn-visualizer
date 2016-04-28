import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import * as graphConstants from '../networkGraph/graphConstants';
import InputLayerInfo from './InputLayerInfo';
import HiddenLayerInfo from './HiddenLayerInfo';
import BiasHistoryInfo from './BiasHistoryInfo';
import ActivationHistoryInfo from './ActivationHistoryInfo';
import OutputLayerInfo from './OutputLayerInfo';

export default class InfoButtons extends React.Component {
  render() {
    const style = {
      position: 'relative',
      display: 'inline-block',
      width: `${graphConstants.WIDTH}px`,
      textAlign: 'left',
      marginTop: '10px'
    };
    return (
      <div style={style}>
        <span style={{ fontSize: '13px', fontStyle: 'italic' }}>Click buttons for more info</span>

        <InputLayerInfo style={{ top: '25px', left: 0 }}/>

        <HiddenLayerInfo
          style={{ top: '25px', left:`${graphConstants.WIDTH / 2 - 90}px` }}
        />

        <BiasHistoryInfo
          layer={0}
          $$network={this.props.$$network}
          style={{ top: '67px', left: `${graphConstants.WIDTH / 2 - 90}px` }}
        />

        <ActivationHistoryInfo
          layer={1}
          $$network={this.props.$$network}
          $$selectedDrawing={this.props.$$selectedDrawing}
          style={{ top: '110px', left: `${graphConstants.WIDTH / 2 - 90}px` }}
        />

        <OutputLayerInfo style={{ top: '25px', right: '25px' }}/>

        <BiasHistoryInfo
          layer={1}
          $$network={this.props.$$network}
          style={{ top: '67px', right: '25px' }}
        />

        <ActivationHistoryInfo
          layer={2}
          $$network={this.props.$$network}
          $$selectedDrawing={this.props.$$selectedDrawing}
          style={{ top: '110px', right: '25px' }}
        />

        <RaisedButton
          style={{ width: '175px', position: 'absolute', top: '25px', left:`${graphConstants.WIDTH / 4 - 65}px` }}
          label="Weight Info"/>

      </div>
    );
  }
}
