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
import { getValueFromEvent } from "rc-form/lib/utils";

// @Form.create({
//   // onValuesChange: (props, changedValues, allValues) => {
//   //   console.log(changedValues, allValues);
//   // }
// })
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
      data: {}, // 搜集数据
    }

    // this.createOperate();

    // props.hasSN && this.createSN();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.dataSource,
    });
  }

  getColumns = () => {
    let { columns, onChange } = this.props;
    let { dataSource } = this.state;
    columns = columns.map(cell => {
      return {
        ...cell,
        render: (text, record, index) => {
          const fieldKey = `row_${index}_${cell.dataIndex}`;
          const { data } = this.state;
          data[fieldKey] = text;
          return (
            // <Input {...getFieldProps(fieldKey, {
            //   initialValue: text,
            //   getValueFromEvent: (...args) => {
            //     console.log(getValueFromEvent(...args));
            //     // this.updateDataSource(fieldKey, getValueFromEvent(...args));
            //     onChange && onChange(dataSource, { index, type: "edit" });
            //     return getValueFromEvent(...args);
            //   }
            // })}/>
            <Input
              defaultValue={data[fieldKey]}
              // onChange={(e) => {
              //   let value = data[fieldKey] = e.target.value;
              //   this.updateDataSource(fieldKey, value);
              //   onChange && onChange(dataSource, { index, type: "edit" });
              // }}
              onInput={(e) => {
                let value = data[fieldKey] = e.target.value;
                this.updateDataSource(fieldKey, value);
                onChange && onChange(dataSource, { index, type: "edit" });
              }}
            />
          )
        }
      }
    });
    return columns;
  }

  updateDataSource = (currentFieldKey, value) => {
    const { data } = this.state;
    let source = data;
    let { dataSource } = this.state;
    for(let fieldKey in source) {
      console.log(fieldKey)
      let [_, index, key] = fieldKey.split("_");
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
    // const { getFieldDecorator } = this.props.form;
    // console.log('render');

    let { columns, onChange } = this.props;
    let { dataSource } = this.state;
    let myColumns = columns.map((cell, index) => {
      return {
        ...cell,
        render: (text, record, index) => {
          const fieldKey = `row_${index}_${cell.dataIndex}`;
          const { data } = this.state;
          data[fieldKey] = text;
          return (
            // <Input {...getFieldProps(fieldKey, {
            //   initialValue: text,
            //   getValueFromEvent: (...args) => {
            //     console.log(getValueFromEvent(...args));
            //     // this.updateDataSource(fieldKey, getValueFromEvent(...args));
            //     onChange && onChange(dataSource, { index, type: "edit" });
            //     return getValueFromEvent(...args);
            //   }
            // })}/>
            <Input
              key={fieldKey}
              defaultValue={data[fieldKey]}
              onChange={(e) => {
                this.updateDataSource(fieldKey, e.target.value);
                onChange && onChange(dataSource, { index, type: "edit" });
              }}
              // onBlur={(e) => {
              //   // let value = data[fieldKey] = e.target.value;
              //   this.updateDataSource(fieldKey, e.target.value);
              //   onChange && onChange(dataSource, { index, type: "edit" });
              // }}
            />
          )
        }
      }
    });

    console.log(myColumns);

    return (
      <div>
        <Table
          columns={myColumns}
          dataSource={this.state.dataSource}
          rowKey={record => rowUuid()}
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
        {/* {getFieldDecorator("name")(
          <Input />
        )} */}
        <div><a onClick={() => {
          console.log(this.state.data);
        }}>press</a></div>
      </div>
    )
  }
} 
