/**
 * Label 组件
 * @author ranguangyu
 * @date 2019-5-1
 */

import "./index.less";
import React from "react";
import classnames from "classnames";

export default class Label extends React.Component {
  static defaultProps = {
    title: "字段说明",
    value: "值",
    isLongText: false,
  }

  render() {
    const { title, value, isLongText } = this.props;
    const className = classnames("z-label", { "long-text": isLongText });
    return (
      <div className={className}>
        <label className="z-label-title">{title && `${title}：`}</label>
        <span className="z-label-value" title={value}>{value}</span>
      </div>
    )
  }
}