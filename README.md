### Visualization of a feed forward Neural Network using MNIST dataset

See [visualization and project details here](nn-mnist.sennabaum.com)

##### Why?
This project started off as an attempt to run an MNIST classification neural network in the browser with
a real time visualization. See this repo for why we [changed our mind.](https://github.com/csenn/basic-nn-js)

Instead, we ran the neural nets in advance and saved snapshots of them through the learning process. This
turned out to provide exactly the type of experience we were looking for without having to push the browser so hard.

This project was a great way to learn the details of simple feedforward neural networks. It was also a nice refresher
for using D3.js.

##### Future
There are more statistics that could be visualized such as the change in cost, fine grained analysis of the change in weights, or gradients analysis. Relu, other activation functions, and softmax are common techniques that could be added. The neural networks could be run in real time using a library such as Tensor Flow on the backend.

Convolutional neural networks also seem like a cool next thing to visualize... Maybe three.js??
