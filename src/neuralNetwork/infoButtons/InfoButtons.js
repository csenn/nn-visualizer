import _ from 'lodash';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import * as graphConstants from '../networkGraph/graphConstants';
import InputLayerInfo from './InputLayerInfo';

export default class InfoButtons extends React.Component {
  render() {
    const style = {
      position: 'relative',
      display: 'inline-block',
      width: `${graphConstants.WIDTH}px`,
      textAlign: 'left'
    }
    return (
      <div style={style}>
        <InputLayerInfo style={{ top: 0, left: 0 }}/>

        <RaisedButton
          style={{width: '175px', position: 'absolute', top: '0px', left:`${graphConstants.WIDTH / 4 - 65}px` }}
          label="Weight Info"/>

        <RaisedButton
          style={{width: '175px', position: 'absolute', top:0, left:`${graphConstants.WIDTH / 2 - 80}px` }}
          label="Layer Info"/>
        <RaisedButton
          style={{width: '175px', position: 'absolute', top: '45px', left: `${graphConstants.WIDTH / 2 - 88}px` }}
          label="Bias History"/>
        <RaisedButton
          style={{width: '175px', position: 'absolute', top: '90px', left: `${graphConstants.WIDTH / 2 - 110}px` }}
          label="Activation History"/>

        <RaisedButton
          style={{width: '175px', position: 'absolute', top: '0px', left:`${graphConstants.WIDTH / 4 * 3 - 110}px` }}
          label="Weight Info"/>

        <RaisedButton
          style={{width: '175px', position: 'absolute', top:0, right:'32px'}}
          label="Layer Info"/>
        <RaisedButton
          style={{width: '175px', position: 'absolute', top: '45px', right:'25px'}}
          label="Bias History"/>
        <RaisedButton
          style={{width: '175px', position: 'absolute', top: '90px', right:'0px'}}
          label="Activation History"/>

      </div>
    )
  }
}
