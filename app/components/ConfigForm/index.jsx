/**
 * 可配置表单组件
 * @author ranguangyu
 * @date 2019-5-13
 */

import React from "react";
import { InputNumber, Input, DatePicker,  } from "antd";
import EnumSelect from "@components/EnumSelect";
import EnumChoice from "@components/EnumChoice";
import { Form, Row, Col, } from "antd";
import { fetch, validator } from "@utils";

export default class ConfigForm extends React.Component {
  /**
	 * 转换校验规则
	 */
  convertRules = (item) => {
    let { spread: { rules } = {} } = item;
    if (rules && rules.length > 0) {
      rules = rules.map(rule => {
        return rule.validator ? validator[rule.validator] : rule;
      });
      item["spread"]["rules"] = rules;
    }
    return item;
  };

  /**
   * 渲染输入控件
   * @param {Object} 控件属性
   * @return {JSX}
   */
  inputRender = (config) => {
    const { getFieldDecorator } = this.props.upForm;
    const {
      type,
      field,
      value,
      label,
      spread = {},
    } = this.convertRules(config);
    const inputProps = () => {
      return Object.assign({
        style: { width: "100%" },
        ...spread,
      });
    }
    const elementMap = {
      "number": () => {
        return (
          <InputNumber {...inputProps()} />
        )
      },
      "text": () => {
        return (
          <Input {...inputProps()} />
        )
      },
      "textarea": () => {
        return (
          <Input.TextArea rows={4} {...inputProps()} />
        )
      },
      "date": () => {
        return (
          <DatePicker {...inputProps()} />
        )
      },
      "enumselect": () => {
        return (
          <EnumSelect {...inputProps()} />
        )
      }
    }
    let formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
    if (spread.layout
      && spread.layout.formItemLayout) {
      formItemLayout = spread.layout.formItemLayout;
    }
    return (
      <Form.Item {...formItemLayout} label={label}>
        {getFieldDecorator(field, {
          initialValue: value,
          ...spread,
        })(
          elementMap[type] ? elementMap[type]() : `暂不支持${type}组件`
        )}
      </Form.Item>
    )
  };

  render() {
    const { configList } = this.props;
    return (
      <Row>
        {configList && configList.map((config, index) => {
          let span = 12;
          if (config.spread
              && config.spread.layout
              && config.spread.layout.span) {
            span = config.spread.layout.span;
          }
          return (
            <Col
              span={span}
              key={config.id || index}
            >
              {this.inputRender(config)}
            </Col>
          )
        })}
      </Row>
    )
  }
} 
