import React from 'react';
import { Chart } from 'react-google-charts';

export class PlanetChart extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      if (typeof this.props.chartData.data == 'undefined') {
        return '';
      }
      return (
        <Chart
          chartType="BarChart"
          data={this.props.chartData.data}
          options={this.props.chartData.options}
          graph_id="BarChart"
          width="100%"
          height="400px"
          legend_toggle
        />
      );
    }
  }