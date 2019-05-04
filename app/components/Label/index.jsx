/**
 * Label 组件
 * @author ranguangyu
 * @date 2019-5-1
 */

import "./index.less";
import React from "react";

export default class Label extends React.Component {
  static defaultProps = {
    title: "字段说明",
    value: "值",
  }

  render() {
    const { title, value } = this.props;
    return (
      <div className="z-label">
        <label className="z-label-title">{title}</label>：
        <span className="z-label-value">{value}</span>
      </div>
    )
  }
}