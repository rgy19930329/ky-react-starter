/**
 * 单选框组件
 * @author ranguangyu
 * @date 2019-01-26
 */

import React from "react";
import PropTypes from "prop-types";
import { Radio } from "antd";
import HOCLoading from "@components/HOCLoading";

@HOCLoading()
export default class EnumRadio extends React.Component {
  static propTypes = {
    list: PropTypes.array, // 数据源列表
    codeKey: PropTypes.string, // code 键名
    labelKey: PropTypes.string, // label 键名
    createPromise: PropTypes.func, // 传入一个生成promise的函数
    promiseCondition: PropTypes.string, // promise重复触发条件标识
  }

  static defaultProps = {
    list: [],
    codeKey: "code",
    labelKey: "name",
    promiseCondition: "",
  }

  state = {
    loaded: true,
  };

  componentDidMount() {
    const { createPromise } = this.props;
    createPromise && this.load(createPromise());
  }

  componentWillReceiveProps(nextProps) {
    const { createPromise } = nextProps;
    if(this.props.promiseCondition !== nextProps.promiseCondition) {
      createPromise && this.load(createPromise());
    }
  }

  load = async (enumPromise) => {
    const list = await enumPromise;
    if (list.length > 0) {
      this.setState({ list });
    }
  }

  render() {
    const { codeKey, labelKey } = this.props;
    const list = this.state.list || this.props.list || [];
    const radios = list.map(item => {
      if(typeof item !== "object") {
        return (
          <Radio value={item} key={`radio-${item}`}>{item}</Radio>
        )
      }else{
        return (
          <Radio value={item[codeKey]} key={`radio-${item[codeKey]}`}>
            {item[labelKey]}
          </Radio>
        )
      }
    });
    return (
      <Radio.Group {...this.props}>{radios}</Radio.Group>
    )
  }
} 
