/**
 * 可编辑表格
 * @author ranguangyu
 * @date 2019-3-3
 */

import React from "react";
import PropTypes from "prop-types";
import { Form, Table, Icon, Input } from "antd";
import { getValueFromEvent } from "rc-form/lib/utils";

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
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      dataSource: nextProps.dataSource
    });
  }

  getColumns = () => {
    let { form: { getFieldProps }, columns } = this.props;
    let { dataSource } = this.state;
    columns = columns.map(cell => {
      if (!cell.render) {
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
                      let value = getValueFromEvent(...args);
                      this.update(fieldKey, value);
                      return value;
                    }
                  })}
                />
              </div>
            )
          }
        }
      } else {
        return {
          ...cell,
          render: (text, record, index) => {
            const fieldKey = `${index}_${cell.dataIndex}`;
            let getProps = (opts) => getFieldProps(fieldKey, Object.assign({
              initialValue: text,
            }, opts, {
              getValueFromEvent: (...args) => {
                let value = (opts.getValueFromEvent || getValueFromEvent)(...args);
                this.update(fieldKey, value);
                return value;
              }
            }));
            return cell.render(text, record, index, getProps);
          }
        }
      }
    });
    return columns;
  }

  /**
   * 更新数据
   */
  update = (currentFieldKey, value) => {
    let source = this.props.form.getFieldsValue();
    let { onChange } = this.props;
    let { dataSource } = this.state;
    for (let fieldKey in source) {
      let [index, key] = fieldKey.split("_");
      if (currentFieldKey === fieldKey) {
        dataSource[index][key] = value;
        this.setState({ dataSource });
        onChange && onChange(dataSource, { index, type: "edit" });
        break;
      }
    }
  }

  /**
   * 支持序号
   */
  createSN = () => {
    let { columns } = this.props;
    let snFilterList = columns.filter(item => item.dataIndex === "sn");
    if (snFilterList.length > 0) {
      return;
    }
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
    let operateFilterList = columns.filter(item => item.dataIndex === "operate");
    if (operateFilterList.length > 0) {
      return;
    }
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
    // columns.forEach(col => {
    //   row[col.dataIndex] = "";
    // });
    dataSource.push(row);
    this.setState({ dataSource });
    onChange && onChange(dataSource, {
      type: "add",
    });
  }

  render() {
    this.createOperate();

    this.props.hasSN && this.createSN();

    return (
      <div>
        <Table
          columns={this.getColumns()}
          dataSource={this.props.dataSource}
          rowKey={(record, index) => `${index}`}
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
        <div><a onClick={() => {
          console.log(this.state.data);
        }}>press</a></div>
      </div>
    )
  }
} 
