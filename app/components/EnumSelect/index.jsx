/**
 * 下拉框组件
 * @author ranguangyu
 * @date 2019-01-25
 */

import React from "react";
import PropTypes from "prop-types";
import { Select, Spin, Icon, } from "antd";
import debounce from "lodash.debounce";

const Option = Select.Option;

export default class EnumSelect extends React.Component {
  static propTypes = {
    list: PropTypes.array, // 数据源列表
    codeKey: PropTypes.string, // code 键名
    labelKey: PropTypes.string, // label 键名
    createPromise: PropTypes.func, // 传入一个生成promise的函数
    promiseCondition: PropTypes.string, // promise重复触发条件标识
    hasAll: PropTypes.bool, // 是否支持选择"全部"
    showSearch: PropTypes.bool, // 是否支持搜索
    searchPromise: PropTypes.func, // 传入一个生成search promise的函数
    searchDelay: PropTypes.number, // 搜索时的等待输入时间（毫秒） 
  }

  static defaultProps = {
    list: [],
    codeKey: "code",
    labelKey: "name",
    hasAll: false,
    promiseCondition: "",
    showSearch: false,
    searchPromise: () => new Promise(resolve => resolve([])),
    searchDelay: 500,
  }

  state = {
    searching: false,
  };

  constructor(props) {
    super(props);
    this.doSearch = debounce(this.doSearch, props.searchDelay);
  }

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
    if (Object.prototype.toString.call(list) === "[object Array]" && list.length > 0) {
      this.setState({ list });
    }
  }

  /**
   * 组装搜索props
   */
  fixSearchProps = () => {
    this.searchProps = {};
    if (this.props.showSearch) {
      this.searchProps = {
        filterOption: false,
        notFoundContent: this.state.searching
          ? <Spin indicator={<Icon type="loading" style={{ fontSize: 20 }} spin />} /> 
          : null,
        onSearch: this.doSearch,
      }
    }
  }

  /**
   * 执行搜索
   */
  doSearch = async (value) => {
    if (!value) {
      return;
    }
    this.setState({ searching: true })
    const list = await this.props.searchPromise(value);
    this.setState({
      list,
      searching: false,
    });
  }

  render() {
    const { codeKey, labelKey, hasAll } = this.props;
    const list = this.state.list || this.props.list || [];
    const options = list.map((item, index) => {
      if (typeof item !== "object") {
        return (
          <Option value={item} key={`option-${index}`}>
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
    this.fixSearchProps();
    return (
      hasAll ?
        <Select {...this.props}>
          <Option value="">全部</Option>
          {options}
        </Select>
        :
        <Select {...this.props} {...this.searchProps}>
          {options}
        </Select>
    )
  }
} 
