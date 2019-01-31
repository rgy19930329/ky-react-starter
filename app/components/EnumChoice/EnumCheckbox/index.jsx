/**
 * 复选框组件
 * @author ranguangyu
 * @date 2019-01-27
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Spin, Icon } from 'antd';
import HOCLoading from '@components/HOCLoading';

@HOCLoading
export default class EnumCheckbox extends React.Component {
  static propTypes = {
    list: PropTypes.array, // 数据源列表
    codeKey: PropTypes.string, // code 键名
    labelKey: PropTypes.string, // label 键名
    createPromise: PropTypes.func, // 传入一个生成promise的函数
    promiseCondition: PropTypes.string, // promise重复触发条件标识
  }

  static defaultProps = {
    list: [],
    codeKey: 'code',
    labelKey: 'name',
    promiseCondition: '',
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
    this.setState({ loaded: false });
    const list = await enumPromise;
    if (list.length > 0) {
      this.setState({ list });
    }
    this.setState({ loaded: true });
  }

  render() {
    const { codeKey, labelKey } = this.props;
    const list = this.state.list || this.props.list || [];
    const checkboxs = list.map(item => {
      if(typeof item !== 'object') {
        return (
          <Checkbox value={item} key={`checkbox-${item}`}>{item}</Checkbox>
        )
      }else{
        return (
          <Checkbox value={item[codeKey]} key={`checkbox-${item[codeKey]}`}>
            {item[labelKey]}
          </Checkbox>
        )
      }
    });

    return (
      <Checkbox.Group {...this.props}>{checkboxs}</Checkbox.Group>
    )
  }
} 
