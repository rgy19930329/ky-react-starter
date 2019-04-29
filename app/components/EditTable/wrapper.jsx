/**
 * 校验信息提示容器
 * @author ranguangyu
 * @date 2019-4-29
 */

import React from "react";
import PropTypes from "prop-types";
import { Popover } from "antd";

export default class Wrapper extends React.Component {
  static propTypes = {
    validateStatus: PropTypes.object,
  }

  static defaultProps = {
    validateStatus: {},
  }

  render() {
    const { status, message } = this.props.validateStatus;
    const isError = status === "error";
    return (
      <Popover
        content={message && message[0]}
        visible={isError}
        overlayClassName={isError ? "popover-error" : ""}
      >
        <div className={isError ? "field-error" : ""}>
          {this.props.children}
        </div>
      </Popover>
    )
  }
} 
