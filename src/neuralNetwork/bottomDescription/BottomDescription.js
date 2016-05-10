import React from 'react';
import * as graphConstants from '../networkGraph/graphConstants';

export default class BottomDescription extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center', marginTop: '150px',  lineHeight: '1.4', background: 'white'}}>

        <div style={{ display: 'inline-block', marginTop: '30px', maxWidth: graphConstants.WIDTH, textAlign: 'left' }}>
          <h2>
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
            a nice vizualization possible. For more information see <a href="http://yann.lecun.com/exdb/mnist/">Yann Lecun's MNIST Database</a>
          </p>
          <p>
            The purpose of this visualization is to view <strong>basic feed forward neural networks</strong> in action.
            The networks have learned to read numbers written by people, and then guess the values of the number.
            The goal of this project is <strong>not to create the most accurate neural network
            possible</strong>. In fact, some researchers have had categorization accuracies over 99% while we are
            working in the 80% - 95% range. We simply want to enforce the intuition of how a "function" is built that maps inputs
            to outputs (by using network weights and biases).
          </p>

          <h2>
            Visualization Information
          </h2>

          <p>
            The visualization has 2 states.
          </p>

          <ul>
            <li>
              <strong> The first (blue and grey color)</strong> is a trained network with weights
              and biases. Blue edges are positive, grey edges are negative. Thicker edges (the lines connecting layers)
              represent a larger absolute value of the weight. Biases are the black numbers between the edges.
            </li>
            <li>
              <strong> The second (yellow and grey color)</strong> is a trained network with weight, biases, and activations being fed an MNIST image.
              Yellow lines represent <strong>edges exiting active nodes</strong>. Yellow nodes have an activation above 0.5.
              It's meant to look like a flashlight illuminating certain paths through the network.
            </li>
          </ul>

          <p style={{fontStyle:"italic"}}>
            Note: Edges are thicker and thinner relative to edges in their layer.
            Edge thickness should not be compared between layers.
          </p>

          <p>
            <strong>Click the biases or the output digits directly on the visualization
            for a break down of calculations and network accuracy.</strong>
          </p>

          <p>
            When the network is initially run, we save a snapshot (equivalent to an epoch) of the network at different points in time.
            <strong> Use the slider to see how the network weights and biases change over time.</strong>
          </p>

          <h2>
            Some Intuitions Gained
          </h2>
          <p>
            784 x 30 edges (the maximum connections between layers in this visualization)
            is considered a small number of edges.
            Yet the more you stare at and analyze these edges and their calculations, the more you grasp
            the scope and complexity of interactions in large modern networks. And the
            human brain has levels of magnitude more connections then this visualization.
          </p>

          <p>
            Networks with a learning rate of 3.0 gained a high percentage of their accuracy bumps in just the first epoch. The final
            epochs offered smaller improvements.
          </p>

          <p>
            A network with only 5 hidden nodes has a perfomance of 87%. These results were considerably better
            then expected, and when feeding in digits it's a great visualization to play with to see how
            the activations in the hidden layer effect those in the output layer.
          </p>

          <p>
            The network with a learning rate of 0.3 is nice to look at because it
            learns slower over all epochs. It is likely given more
            epochs to learn from it would have continued to improve to a higher final performance.
          </p>

          <p>
            Not shown, but tested. Shifting test images more then a few pixels can
            do havoc to the network's accuracy. Convolutional neural
            networks and manufacturing new training data with image
            transformations are techniques that can help.
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
