/** @jsx React.DOM */

'use strict';

var React = require('react');

var Line = React.createClass({

  propTypes: {
    strokeWidth: React.PropTypes.number,
    path: React.PropTypes.string,
    fill: React.PropTypes.string,
    stroke: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      stroke: '#1f77b4',
      fill: 'none'
    };
  },

  render: function() {
    return (
      <path
        d={this.props.path}
        stroke={this.props.stroke}
        fill={this.props.fill}
        strokeWidth={this.props.strokeWidth}
      />
    );
  }

});

module.exports = Line;
