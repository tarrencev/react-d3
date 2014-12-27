/** @jsx React.DOM */

'use strict';

var React = require('react');

var Circle = React.createClass({

  propTypes: {
    cx: React.PropTypes.number,
    cy: React.PropTypes.number,
    r: React.PropTypes.number,
    fill: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      fill: '#1f77b4'
    };
  },

  render: function() {
    return (
      <circle
        cx={this.props.cx}
        cy={this.props.cy}
        r={this.props.r}
        fill={this.props.fill}
      />
    );
  }

});

module.exports = Circle;
