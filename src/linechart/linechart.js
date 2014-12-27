/** @jsx React.DOM */

'use strict';

var React = require('react');
var d3 = require('d3');
var Chart = require('../common').Chart;
var DataSeries = require('./dataseries');
var XAxis = require('./xaxis');
var YAxis = require('./yaxis');

var LineChart = React.createClass({

  propTypes: {
    margins: React.PropTypes.object,
    pointRadius: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    axesColor: React.PropTypes.string,
    title: React.PropTypes.string,
    colors: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      margins: {top: 20, right: 30, bottom: 30, left: 30},
      pointRadius: 3,
      width: 400,
      height: 200,
      axesColor: '#000',
      title: '',
      colors: d3.scale.category20c()
    };
  },

  getInitialState: function() {
    return {
      maxX: 0,
      maxY: 0,
      chartWidth: 0,
      chartHeight: 0
    };
  },

  componentWillMount: function() {
    this._calculateState();
  },

  render: function() {

    var dataSeriesArray = [];
    var index = 0;

    for(var seriesName in this.props.data) {
      if (this.props.data.hasOwnProperty(seriesName)) {
        dataSeriesArray.push(
            <DataSeries
              scaleX={this.state.scaleX}
              scaleY={this.state.scaleY}
              seriesName={seriesName}
              data={this.props.data[seriesName]}
              width={this.state.chartWidth}
              height={this.state.chartHeight}
              color={this.props.colors(index)}
              pointRadius={this.props.pointRadius}
              key={seriesName}
            />
        )
        index++;
      }
    }

    var trans = "translate(" + this.props.margins.left + "," + this.props.margins.top + ")"

    return (
      <Chart width={this.props.width} height={this.props.height} title={this.props.title}>
        <g transform={trans}>
          {dataSeriesArray}
          <YAxis
            scaleY={this.state.scaleY}
            margins={this.props.margins}
            yAxisTickCount={this.props.yAxisTickCount}
            width={this.state.chartWidth}
            height={this.state.chartHeight}
            color={this.props.axesColor}
          />
          <XAxis
            scaleX={this.state.scaleX}
            data={this.props.data}
            margins={this.props.margins}
            width={this.state.chartWidth}
            height={this.state.chartHeight}
            color={this.props.axesColor}
          />
        </g>
      </Chart>
    );
  },

  _calculateState: function() {

    var maxY = 0,
        maxX = 0;

    for(var series in this.props.data) {
      var seriesMaxY = d3.max(this.props.data[series], function(d) {
        return d.y;
      });

      var seriesMaxX = d3.max(this.props.data[series], function(d) {
        return d.x;
      });

      maxX = (seriesMaxX > maxX) ? seriesMaxX : maxX;
      maxY = (seriesMaxY > maxY) ? seriesMaxY : maxY;
    }

    var chartWidth = this.props.width - this.props.margins.left - this.props.margins.right;
    var chartHeight = this.props.height - this.props.margins.top - this.props.margins.bottom;

    var scaleX = d3.scale.linear()
      .domain([0, maxX])
      .range([0, chartWidth]);

    var scaleY = d3.scale.linear()
      .domain([0, maxY])
      .range([chartHeight, 0]);

    this.setState({
      maxX: maxX,
      maxY: maxY,
      scaleX: scaleX,
      scaleY: scaleY,
      chartWidth: chartWidth,
      chartHeight: chartHeight
    })
  }

});

exports.LineChart = LineChart;
