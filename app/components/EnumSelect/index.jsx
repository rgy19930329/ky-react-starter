/**
 * 下拉框组件
 * @author ranguangyu
 * @date 2019-01-25
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

export default class EnumSelect extends React.Component {
  static propTypes = {
    list: PropTypes.array, // 数据源列表
    codeKey: PropTypes.string, // code 键名
    labelKey: PropTypes.string, // label 键名
    createPromise: PropTypes.func, // 传入一个生成promise的函数
    promiseCondition: PropTypes.string, // promise重复触发条件标识
    hasAll: PropTypes.bool, // 是否能选择"全部"
  }

  static defaultProps = {
    list: [],
    codeKey: 'code',
    labelKey: 'name',
    hasAll: false,
    promiseCondition: '',
    // 原有属性
    notFoundContent: '暂无数据',
  }

  state = {};

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
    const { codeKey, labelKey, hasAll } = this.props;
    const list = this.state.list || this.props.list || [];
    const options = list.map(item => {
      if (typeof item !== 'object') {
        return (
          <Option value={item} key={`option-${item}`}>
            {item}
          </Option>
        )
      } else {
        return (
          <Option value={item[codeKey]} key={`option-${item[codeKey]}`}>
            {item[labelKey]}
          </Option>
        )
      }
    });
    return (
      hasAll ?
        <Select {...this.props}>
          <Option value="">全部</Option>
          {options}
        </Select>
        :
        <Select {...this.props}>
          {options}
        </Select>
    )
  }
} 
