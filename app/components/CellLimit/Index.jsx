/**
 * @desc 组件 - CellLimit - 超出限制宽度部分通过省略号展示
 * @author rgy
 * @date 2019-07-23 18:57:51
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";

export default class CellLimit extends React.Component {
  
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    width: "100%",
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  /**
   * 获取节点文本
   */
  dfsGetText = (children) => {
    if (typeof children === "string") {
      return children;
    }
    return this.dfsGetText(children.props.children);
  };

  render() {
    const { children, width } = this.props;
    return (
      <div
        className="comp-cell-limit-wrapper"
        style={{width}}
        title={this.dfsGetText(children)}
      >
        {children}
      </div>
    )
  }
}
