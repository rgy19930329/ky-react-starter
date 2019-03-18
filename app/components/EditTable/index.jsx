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

    this.createForm();

    // this.createOperate();

    // props.hasSN && this.createSN();
  }

  /**
   * 生成表单
   */
  createForm = () => {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldsValue,
      getFieldValue,
    } = this.props.form;
    let { columns } = this.props;
    columns = columns.map(cell => {
      // if (!cell.render) {
      //   cell.options = cell.options || {};
      //   cell.decorator = cell.decorator || {};
      //   cell.component = cell.component || Input;
      //   cell.render = (text, record, index) => {
      //     const fieldKey = `row_${index}_${cell.dataIndex}`;
      //     return (
      //       <div className="edit-cell">
      //         {getFieldDecorator(fieldKey, {
      //           ...cell.decorator,
      //         })(
      //           <cell.component {...cell.options} />
      //         )}
      //       </div>
      //     )
      //   }
      // }
      cell.render = (text, record, index) => {
        console.log(text);
        const fieldKey = `row_${index}_${cell.dataIndex}`;
        return (
          <div className="edit-cell">
            {getFieldDecorator(fieldKey, {
              initialValue: text,
            })(
              <Input />
            )}
          </div>
        )
      };
      return cell;
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
          const fieldKey = `row_${index}_${cell.dataIndex}`;
          return (
            <div className="edit-cell">
              {/* {getFieldDecorator(fieldKey, {
                initialValue: text,
                getValueFromEvent: (...args) => {
                  console.log(args);
                  return "ssss";
                }
              })(
                <Input />
              )} */}
              <Input {...getFieldProps(fieldKey, {
                initialValue: text,
                getValueFromEvent: (...args) => {
                  console.log(getValueFromEvent(...args));
                  this.updateDataSource(fieldKey, getValueFromEvent(...args));
                  onChange && onChange(dataSource, { index, type: "edit" })
                  return getValueFromEvent(...args);
                }
              })}/>
            </div>
          )
        }
      }
    });
    return columns;
  }

  updateDataSource = (currentFieldKey, value) => {
    let source = this.props.form.getFieldsValue();
    // source = source.map(item => {
    //   console.log(item);
    //   return item;
    // });
    let { dataSource } = this.state;
    for(let fieldKey in source) {
      let [_, index, key] = fieldKey.split("_");
      if (currentFieldKey === fieldKey) {
        dataSource[index][key] = value;
      } else {
        dataSource[index][key] = source[fieldKey];
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
    const { getFieldDecorator } = this.props.form;
    console.log('render');
    return (
      <div>
        <Table
          columns={this.getColumns()}
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
          console.log(this.props.form.getFieldsValue());
        }}>press</a></div>
      </div>
    )
  }
} 
