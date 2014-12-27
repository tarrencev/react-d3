/** @jsx React.DOM */

'use strict';

var React = require('react');
var d3 = require('d3');

var XAxis = React.createClass({

  componentWillReceiveProps: function(props) {
    this._renderAxis(props);
  },

  render: function() {
    var t = "translate(0," + this.props.height + ")"
    return (
      <g
        ref='linexaxis'
        className="linex axis"
        transform={t}
      >
      </g>
    );
  },

  componentDidMount: function() {
    this._renderAxis(this.props);
  },

  _renderAxis: function(props) {
    var xAxis = d3.svg.axis()
      .scale(props.scaleX)
      .orient("bottom");

    var node = this.refs.linexaxis.getDOMNode();

    d3.select(node)
      .attr("class", "linex axis")
      .style("fill", props.color)
      .call(xAxis);

    // Style each of the tick lines
    var lineXAxis = d3.select('.linex.axis')
      .selectAll('line')
      .attr("shape-rendering", "crispEdges")
      .attr("stroke", props.color);

    // Style the main axis line
    d3.select('.linex.axis')
      .select('path')
      .attr("shape-rendering", "crispEdges")
      .attr("fill", "none")
      .attr("stroke", props.color)
      .attr("stroke-width", "1");

    // Hides the x axis origin
    d3.selectAll(".linex.axis g:first-child").style("opacity","0");
  }

});

module.exports = XAxis;
