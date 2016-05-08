import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';

export default class InfoButtons extends React.Component {
  render() {
    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Input Layer"
        modalTitle="The Input Layer"
      >
        <p>
          The <strong>input layer</strong> feeds data into the network. For this MNIST example, a 28x28 grid
          of handwritten digits are the inputs into the network. For each image,
          the grid of pixels are flattened into <strong>784 input nodes</strong> (28x28=784).
        </p>
          <p>
          Let's look
          at a 3x3 grid for an example of this transformation. Here we use a variety of colors,
          but each color could just as easily be shades of grey and black as in the
          MNIST example. Notice how each row is flipped horizontally and
          stacked on top each other.
        </p>

        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '60%' }}>
            <table style={{ width: '100%' }}>
              <tr>
                <td style={{ width: '33%' }}>
                  <svg width="90px" height="90px">
                    <rect x="0" y="0" width="30px" height="30px" fill="yellow" stroke="black"/>
                    <rect x="30px" y="0" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="60px" y="0" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="0" y="30px" width="30px" height="30px" fill="pink" stroke="black"/>
                    <rect x="30px" y="30px" width="30px" height="30px" fill="red" stroke="black"/>
                    <rect x="60px" y="30px" width="30px" height="30px" fill="pink" stroke="black"/>
                    <rect x="0" y="60px" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="30px" y="60px" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="60px" y="60px" width="30px" height="30px" fill="blue" stroke="black"/>
                  </svg>
                </td>
                <td style={{ width: '33%' }}>
                  <ArrowForward style={{ width: '60px', height: '60px', fill: 'rgb(50,50,50)' }}/>
                </td>
                <td style={{ width: '33%' }}>
                  <svg width="30px" height="270px">
                    <rect x="0" y="0" width="30px" height="30px" fill="yellow" stroke="black"/>
                    <rect x="0" y="30px" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="0" y="60px" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="0" y="90px" width="30px" height="30px" fill="pink" stroke="black"/>
                    <rect x="0" y="120px" width="30px" height="30px" fill="red" stroke="black"/>
                    <rect x="0" y="150px" width="30px" height="30px" fill="pink" stroke="black"/>
                    <rect x="0" y="180px" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="0" y="210px" width="30px" height="30px" fill="rgb(220,220,220)" stroke="black"/>
                    <rect x="0" y="240px" width="30px" height="30px" fill="blue" stroke="black"/>
                  </svg>
                </td>
              </tr>
            </table>
          </div>
          </div>

      </InfoButtonTemplate>
    );
  }
}
