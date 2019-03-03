/**
 * 可编辑表格
 * @author ranguangyu
 * @date 2019-3-3
 */

import React from "react";
import PropTypes from "prop-types";
import { Form, Table, Icon, Input } from "antd";
import uniqueId from "uniqueid";
const rowUuid = uniqueId("rowKey_");

@Form.create()
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

    this.newProps = Object.assign({}, this.props);

    this.createForm();

    this.createOperate();

    props.hasSN && this.createSN();
  }

  /**
   * 生成表单
   */
  createForm = () => {
    const { columns } = this.props;
    columns.forEach(cell => {
      if(!cell.render) {
        if(cell.editable) {
          cell.option = cell.option || {};
          cell.render = (text, record) => {
            if (cell.component) {
              return (
                <cell.component {...cell.options} />
              )
            } else {
              return (
                <Input {...cell.options}/>
              )
            }
          }
        }
      }
    });
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
    this.newProps["columns"] = columns;
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
          <div style={{textAlign: "center"}}>
            <a onClick={() => this.delRow(index)}>删除</a>
          </div>
        )
      }
    });
    this.newProps["columns"] = columns;
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
          {...this.newProps}
          dataSource={this.state.dataSource}
          rowKey={record => rowUuid()}
          pagination={false}
          bordered={true}
        />
        <div style={{textAlign: "right"}}>
          <a
            onClick={this.addRow}
            style={{fontSize: 20, lineHeight: "36px", padding: 22}}
          >
            <Icon type="plus-circle" />
          </a>
        </div>
      </div>
    )
  }
} 
