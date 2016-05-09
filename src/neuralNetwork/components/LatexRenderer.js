import React from 'react';

export default React.createClass({
  componentDidMount() {
    katex.render(this.props.value, this.refs['latex-box']);
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  },
  componentDidUpdate() {
    katex.render(this.props.value, this.refs['latex-box']);
  },
  render() {
    return (
      <span ref='latex-box'/>
    )
  }
})
