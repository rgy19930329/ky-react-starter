import React from "react";
import PropTypes from "prop-types";

export default class ContextTest extends React.Component {

  static contextTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div>{this.context.title}</div>
    )
  }
}