import React from 'react';
import * as graphConstants from '../networkGraph/graphConstants';

export default class BottomDescription extends React.Component {
  render() {

    const h2Style = {
      textAlign: 'center',
      marginTop: '25px',
      marginBottom: '5px'
    };

    return (
      <div style={{ textAlign: 'center', marginTop: '150px', lineHeight: '1.4', background: 'white' }}>

        <div style={{ display: 'inline-block', marginTop: '30px', marginBottom: '30px', maxWidth: '800px', textAlign: 'left' }}>
          <h2 style={h2Style}>
            What are Neural Networks and the MNIST datasets?
          </h2>
          <p>
            Neural networks are an exciting subset of machine learning algorithms. Although theorized about for more then half a century,
            recent advancements in computer processing power and easier access to large datasets have
            allowed neural networks to offer best in class solutions to difficult problems.
            Versions of neural networks, <strong>called deep neural networks</strong>,
            are being applied to many technologies including use in self driving cars, recognizing objects in images
            and videos, and powering novel voice recognition systems.
          </p>
          <p>
            The MNIST dataset contains 60,000 handwritten numbers collected from Census Bureau employees and highschool students.
            We use the MNIST dataset as it is well known by students and researchers in the machine learning community and because it makes
            a nice vizualization possible. For more information see <a href="http://yann.lecun.com/exdb/mnist/">Yann Lecun's MNIST Database.</a>
          </p>
          <p>
            The purpose of this visualization is to view <strong>basic feed forward neural networks</strong> in action.
            The networks have learned to read numbers written by people, and then guess the values of the number.
            The goal of this project is <strong>not to create the most accurate neural network
            possible</strong>. In fact, some researchers have had categorization accuracies over 99% while we are
            working in the 80% - 95% range. We simply want to enforce the intuition of how a "function" is built that maps inputs
            to outputs (by using network weights and biases).
          </p>

          <h2 style={h2Style}>
            Visualization Information
          </h2>

          <p>
            The visualization has 2 states. Toggle between them by clicking "Feed network with MNIST drawings" above.
          </p>

          <ul>
            <li>
              <strong> The first (blue and grey color)</strong> is a trained network with weights
              and biases. Blue edges are positive, grey edges are negative. Thicker edges (the lines connecting layers)
              represent a larger absolute value of the weight. Biases are the black numbers between
              the edges. <span style={{ fontStyle:'italic'}}>
                Note: Edges are thicker and thinner relative to edges in their layer.
                Edge thickness should not be compared between layers.
              </span>
            </li>
            <li style={{marginTop: '10px'}}>
              <strong> The second (yellow and grey color)</strong> is a trained
              network with weight, biases, and activations being fed an MNIST image.
              Yellow lines represent <strong>edges exiting active nodes</strong>.
              Yellow nodes are active. Thicker edges represent a larger absolute
              value of the weight. It's meant to look like a flashlight
              illuminating certain paths through the network.
            </li>
          </ul>

          <p>
            <strong>Click the biases or the output digits directly on the visualization
            for a break down of calculations and network accuracy.</strong>
          </p>

          <p>
            These networks were run and saved as json in advance. We save a snapshot (equivalent
            to an epoch) of the network at different points in time.
            <strong> Use the slider to see how the network weights and
            biases change over time.</strong>
          </p>

          <h2 style={h2Style}>
            Some Intuitions Gained
          </h2>

          <ul>
            <li>
              784 x 30 edges (the maximum connections between layers in this visualization)
              is considered a small number of edges.
              Yet the more you analyze (and stare at) these edges and their calculations, the more you grasp
              the scope and complexity of interactions in large modern networks. For another comparison, the
              human brain has orders of magnitude more connections than this visualization.
            </li>
            <li style={{marginTop: '10px'}}>
              Tuning parameters is tough. Even in these simple models, relationships
              between learning rate, activation functions, cost functions,
              and hidden layers are difficult to intuit. Rules of thumb can be developed,
              but the whole process still feels a little bit like black magic.
            </li>
            <li style={{marginTop: '10px'}}>
              A network with only 5 hidden nodes has a performance of 87%. These results were considerably better
              than expected, and when feeding in digits it's a great visualization to play with to see how
              the activations in the hidden layer effect those in the output layer.
            </li>
            <li style={{marginTop: '10px'}}>
              Most networks gained a large percentage of their final accuracy
              in just one epoch. And it usually was the case that a higher accuracy
              in the first epoch meant a higher final accuracy. We expected at
              least some networks to spread their learning out over more epochs.
            </li>
            <li style={{marginTop: '10px'}}>
              The network with the lowest accuracy of 82% is nice to look at because it
              learns slower over all epochs. It also categorized every 0 incorrectly.
              According to the charts, given better weight initialization or
              more epochs to learn from, it is likely performance would have
              continued to improve. Assuming it wasn't a bug, the
              fact that it did so poorly with 0 is curious and the reason is unknown.
            </li>
            <li style={{marginTop: '10px'}}>
              Not shown, but tested. Shifting test images more than a few pixels can
              wreak havoc on the network's accuracy. Convolutional neural
              networks and manufacturing new training data with image
              transformations are techniques that can help.
            </li>
          </ul>
          <h2 style={h2Style}>
            Credits
          </h2>

          <p>
            An awesome resource for an introduction to nerual networks is
            Michael Nielsen's <a href="http://neuralnetworksanddeeplearning.com/">Neural Networks and Deep Learning</a>
            <span> The</span> network and charts were built using D3.
            View logic and data management were handled with ReactJS and Redux.
            View our <a href="https://github.com/csenn/nn-visualizer">package.json</a> for all of our dependencies.
          </p>

        </div>
      </div>
    );
  }
}
