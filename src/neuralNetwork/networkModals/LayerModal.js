import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import {Line} from 'react-chartjs';
import ReactHighcharts from 'react-highcharts';

export default class LayerModal extends React.Component {
  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }

  /* Make sure this content does not stay rendered in here for performance */
  _renderContent() {
    if (!_.isNumber(this.props.layerModalIndex)) {
      return false
    }

    const network = this.props.$$network.toJS();
    // const epoch = network[6];
    // const bias = epoch.biases[0][this.props.layerModalIndex][0];
    // const weights = epoch.weights[0][this.props.layerModalIndex];



    // const rows = weights.map(w => {
    //   return (
    //     <div>
    //       {w} - {bias}
    //     </div>
    //   )
    // })

    const labels = [];
    const biases = [];


    const results = Object.keys(network).map(epochIndex => {
      labels.push('Epoch ' + epochIndex);
      biases.push(_.flatten(network[epochIndex].biases[0]))
    });
    //
    //   datasets.push({
    //     label: 'Epoch ' + epochIndex,
    //     //fillColor: "rgba(220,220,220,0.5)",
    //   //  strokeColor: "rgba(220,220,220,0.8)",
    //     //highlightFill: "rgba(220,220,220,0.75)",
    // //    highlightStroke: "rgba(220,220,220,1)",
    //     data:
    //   })

    let datasets = [];
    for (let i=0; i<biases.length; i++) {
      for (let j=0; j<biases[i].length; j++) {
        if (!datasets[j]) {
          datasets[j] = {
            name: 'Bias ' + j,
            data: []
          }
        }
        datasets[j].data.push(biases[i][j]);
      }
    }

//     debugger
//
// debugger
    const chartData = {
      labels, datasets
    }

    // const chartOptions = {
    //    datasetFill : false,
    //     tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    //   //  multiTooltipTemplate: "<%= value %>",
    //   //  multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
    //     multiTooltipTemplate: function() {
    //       debugger;
    //       return 'asdasd'
    //     },
    //     showTooltips: false,
    //
    //     // pointHitDetectionRadius : 3,
    //     // bezierCurve : false,
    //     // scaleShowGridLines : false,
    //    //legendTemplate: "<div></div>"
    //    //legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    //
    // }
    // <Line data={chartData} options={chartOptions}  width="600" height="600"/>

    const config = {
      chart: {
          style: {
              fontFamily: 'Raleway'
          }
      },
        title: {
            text: '',
            x: -20 //center
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com',
        //     x: -20
        // },
        xAxis: {
            categories: labels
        },
        yAxis: {
            title: {
                text: 'Bias'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            // valueSuffix: '°C',
            valueDecimals: 3
        },
        legend: {
          enabled: false
        },
        series: datasets
    }
    // <div>
    //   index = {this.props.layerModalIndex}
    // </div>

    return (
      <div>
        <ReactHighcharts config = {config}/>
      </div>
    )
  }
  render() {
    const isOpen = _.isNumber(this.props.layerModalIndex);
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary
        onClick={this.props.onClose}/>
    ];

    return (
      <Dialog
        title="Change In Bias"
        actions={actions}
        modal={false}
        open={isOpen}
        onRequestClose={this.handleClose}>
        {this._renderContent()}
      </Dialog>
    );
  }
}
