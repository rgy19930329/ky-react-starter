/**
 * 可编辑表格
 * @author ranguangyu
 * @date 2019-3-3
 */

import React from "react";
import PropTypes from "prop-types";
import { Form, Table, Icon, Input } from "antd";
import { getValueFromEvent } from "rc-form/lib/utils";

@Form.create({
  // onValuesChange: (props, changedValues, allValues) => {
  //   console.log(changedValues, allValues);
  // }
})
export default class EditTable extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array, // 数据源
    hasSN: PropTypes.bool, // 是否需要支持序号
    onChange: PropTypes.func, // 列表变更回调
  }

  static defaultProps = {
    dataSource: [],
    hasSN: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: props.dataSource || [],
    }

    this.createOperate();

    props.hasSN && this.createSN();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      dataSource: nextProps.dataSource
    });
  }

  getColumns = () => {
    const {
      getFieldDecorator,
      getFieldProps,
      setFieldsValue,
      getFieldsValue,
    } = this.props.form;
    let { columns, onChange } = this.props;
    let { dataSource } = this.state;
    columns = columns.map(cell => {
      return {
        ...cell,
        render: (text, record, index) => {
          const fieldKey = `${index}_${cell.dataIndex}`;
          return (
            <div className="edit-cell">
              <Input
                {...getFieldProps(fieldKey, {
                  initialValue: text,
                  getValueFromEvent: (...args) => {
                    this.update(fieldKey, getValueFromEvent(...args));
                    onChange && onChange(dataSource, { index, type: "edit" })
                    return getValueFromEvent(...args);
                  }
                })}
              />
            </div>
          )
        }
      }
    });
    return columns;
  }

  update = (currentFieldKey, value) => {
    let source = this.props.form.getFieldsValue();
    let { dataSource } = this.state;
    for (let fieldKey in source) {
      let [index, key] = fieldKey.split("_");
      if (currentFieldKey === fieldKey) {
        dataSource[index][key] = value;
      }
    }
    this.setState({ dataSource });
  }

  /**
   * 支持序号
   */
  createSN = () => {
    let { columns } = this.props;
    columns.unshift({
      title: "序号",
      dataIndex: "sn",
      key: "sn",
      width: 65,
      render: (text, record, index) => {
        return (
          <div>{index + 1}</div>
        )
      }
    });
  }

  /**
   * 支持操作区
   */
  createOperate = () => {
    let { columns } = this.props;
    columns.push({
      title: "操作",
      dataIndex: "operate",
      key: "oprate",
      width: 65,
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            <a onClick={() => this.delRow(index)}>删除</a>
          </div>
        )
      }
    });
  }

  /**
   * 删除行
   */
  delRow = (index) => {
    const { onChange } = this.props;
    let { dataSource } = this.state;
    const record = dataSource[index];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
    onChange && onChange(dataSource, {
      index,
      record,
      type: "delete",
    });
  }

  /**
   * 新增行
   */
  addRow = () => {
    const { columns, onChange } = this.props;
    let { dataSource } = this.state;
    let row = {};
    columns.forEach(col => {
      row[col.dataIndex] = "";
    });
    dataSource.push(row);
    this.setState({ dataSource });
    onChange && onChange(dataSource, {
      type: "add",
    });
  }

  render() {
    return (
      <div>
        <Table
          columns={this.getColumns()}
          dataSource={this.props.dataSource}
          // rowKey={record => rowUuid()}
          pagination={false}
          bordered={true}
          locale={{emptyText: <div><Icon type="frown" /> 暂无数据</div>}}
        />
        <div style={{ textAlign: "right" }}>
          <a
            onClick={this.addRow}
            style={{ fontSize: 20, lineHeight: "36px", padding: 22 }}
          >
            <Icon type="plus-circle" />
          </a>
        </div>
      </div>
    )
  }
} 
