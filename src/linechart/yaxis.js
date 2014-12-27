/** @jsx React.DOM */

'use strict';

var React = require('react');
var d3 = require('d3');

var YAxis = React.createClass({

  componentWillReceiveProps: function(props) {
    this._renderAxis(props);
  },

  render: function() {
    return (
      <g
        ref='lineyaxis'
        className="liney axis"
      >
      </g>
    );
  },

  componentDidMount: function() {
    this._renderAxis(this.props);
  },

  _renderAxis: function(props) {
    var yAxis = d3.svg.axis()
      .ticks(props.yAxisTickCount)
      .scale(props.scaleY)
      .orient("left");

    var node = this.refs.lineyaxis.getDOMNode();

    d3.select(node)
      .attr("class", "liney axis")
      .style("fill", props.color)
      .call(yAxis);

    // Style each of the tick lines
    d3.selectAll('.liney.axis')
      .selectAll('line')
      .attr("shape-rendering", "crispEdges")
      .attr("stroke", props.color);

    // Style the main axis line
    d3.selectAll('.liney.axis')
      .select('path')
      .attr("shape-rendering", "crispEdges")
      .attr("fill", "none")
      .attr("stroke", props.color)
  }

});

module.exports = YAxis;
