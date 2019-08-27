/**
 * @desc 组件 - RInput
 * @author rgy
 * @date 2019-08-27 11:40:16
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import Wrapper from "@components/Wrapper";

export default class RInput extends React.Component {

  static contextTypes = {
    form: PropTypes.object,
  }

  /**
   * 获取字段校验结果
   */
  getValidateStatus = (field) => {
    const {
      isFieldValidating,
      getFieldError,
      getFieldValue,
    } = this.context.form || this.props.form;
    if (!field) {
      return {};
    }
    if (isFieldValidating(field)) {
      return {
        status: "validating",
      };
    }
    if (!!getFieldError(field)) {
      return {
        status: "error",
        message: getFieldError(field),
      };
    }
    if (getFieldValue(field)) {
      return {
        status: "success",
      }
    }
    return {};
  }

  render() {
    const { id } = this.props;
    const validateStatus = this.getValidateStatus(id);

    return (
      <Wrapper validateStatus={validateStatus}>
        <Input {...this.props} />
      </Wrapper>
    )
  }
}
