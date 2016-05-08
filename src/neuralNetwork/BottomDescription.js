import React from 'react';
import * as graphConstants from './networkGraph/graphConstants';

export default class BottomDescription extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center', marginTop: '150px',  lineHeight: '1.4', background: 'white'}}>

        <div style={{ display: 'inline-block', marginTop: '30px', maxWidth: graphConstants.WIDTH, textAlign: 'left' }}>
          <h2>
            What are Neural Networks and the MNIST dataset?
          </h2>

          Neural networks are an exciting subset of machine learning algorithms that have gained considerable traction
          in the technical community in recent years. A version of neural networks, called deep neural networks, are being used
          to create self driving cars, tag objects in complex images, and power novel voice recognition systems.

          <p>
            The purpose of this visualization is to view a <strong>basic single layer neural network</strong> in action.
            We use the MNIST dataset as it is well known by students and researchers in the machine learning community and because it makes
            a nice vizualization possible.
            The MNIST dataset contains 60,000 handwritten numbers collected from Census Bureau employees and highschool students.
            For more information see <a href="http://yann.lecun.com/exdb/mnist/">Yann Lecun's MNIST Database</a>
          </p>
          <p>
            The goal of this project is <strong>not to create the most accurate neural network
            possible</strong>. In fact, some researchers have had categorization accuracies over 99% while we are
            working in the 85% - 95% range. We simply want to enforce the intuition of how a "function" is built that maps inputs
            to outputs using network weights and biases.
          </p>

          <h2>
            Network Information
          </h2>

          <p>
            The visualization has 2 main states.
            <strong> The first (blue and grey color)</strong> is a trained network with weights
            and biases. Blue are positive, grey are negative. Thicker edges (the lines connecting layers)
            represent a larger absoulte value of the weight. Biases are the numbers between the edges.
            <strong> The second (yellow and grey color)</strong> is a trained network being fed an MNIST image.
            Yellow lines represent edges exiting active nodes. <span style={{fontStyle:"italic"}}>Note: Edges are thicker and thinner relative to edges in their layer.
            Edge thickness should not be compared between layers.</span>
          </p>

          <p>
            When the network is initially run, we save a snapshot, equivalent to an epoch, of the network at different points in time.
            Use the slider to see how the network weights and biases change over time.
          </p>

          <p>
            The input layer consits of 784 input nodes. The original image is a 28 x 28 pixel handwritten number (28 x 28 = 784). We flatten the image and each pixel becomes
            an <strong>input node</strong> to feed information into the network. Imagine taking each row of pixels in the picture, turning them horizontally, and stacking them on top of each other.
          </p>
          <h2>
            Credits
          </h2>

          <p>
            An awesome resource for an introduction to machine learning is Michael Nielsen's <a href="http://neuralnetworksanddeeplearning.com/">Neural Networks and Deep Learning</a>
            <span> The</span> network and charts were built using D3. View logic and data management were handled with ReactJS and Redux. View our package.json for all of our dependencies.
          </p>

        </div>




        <div style={{ display: 'inline-block', marginTop: '150px', maxWidth: graphConstants.WIDTH }}>

        </div>
      </div>
    );
  }
}
