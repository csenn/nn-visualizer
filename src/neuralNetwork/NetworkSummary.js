import React from 'react'

export default class Main extends React.Component {

  _renderWrong(wrong) {
    return Object.keys(wrong).map(key => {
      return (
        <div style={{marginLeft: '15px'}}>
          {key}: {wrong[key].length}
        </div>
      )
    })
  }

  render() {
    const testResults = this.props.$$testResults.toJS();

    const results = Object.keys(testResults).map(key => {

      const correctCount = testResults[key].correct.length

      const wrongCount = _.reduce(_.values(testResults[key].wrong), (prev, curr) => {
        return prev + curr.length;
      }, 0)

      return (
        <div style={{marginTop: '15px'}}>
          <div>
              <strong>{key}</strong>: {correctCount} / {wrongCount + correctCount}
          </div>
          {this._renderWrong(testResults[key].wrong)}
        </div>
      )
    })

    return (
        <div>
          {results}
        </div>
    )
  }
}
