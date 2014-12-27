/** @jsx React.DOM */

'use strict';

var React = require('react');
var d3 = require('d3');
var Circle = require('./circle');
var Line = require('./line');

var DataSeries = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    interpolate: React.PropTypes.string,
    color: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      data: [],
      interpolate: 'linear',
      color: '#fff'
    };
  },

  render: function() {
    var self = this;
    var interpolatePath = d3.svg.line()
        .x(function(d) {
          return self.props.scaleX(d.x);
        })
        .y(function(d) {
          return self.props.scaleY(d.y);
        })
        .interpolate(this.props.interpolate);

    var circles = [];

    this.props.data.forEach(function(point, i) {
      circles.push(<Circle cx={this.props.scaleX(point.x)} cy={this.props.scaleY(point.y)} r={this.props.pointRadius} fill={this.props.color} key={this.props.seriesName + i} />);
    }.bind(this));

    return (
      <g>
        <Line path={interpolatePath(this.props.data)} stroke={this.props.color} />
        {circles}
      </g>
    )
  }

});

module.exports = DataSeries;
