import React from "react";
import { InputNumber, Input, DatePicker,  } from "antd";
import EnumSelect from "@components/EnumSelect";
import EnumChoice from "@components/EnumChoice";
import { Form, Button, Row, Col, } from "antd";
import { fetch } from "@utils";
import { each, add } from "@utils/wdio";

const ref = new Wilddog("https://kylin.wilddogio.com/test");
const configRef = ref.child("users");

@Form.create()
export default class ConfigForm extends React.Component {

  state = {
    searchList: [
      {
        type: "text",
        field: "name",
        value: "",
        label: "姓名",
        id: "0001",
      },
      {
        type: "number",
        field: "age",
        value: "",
        label: "年龄",
        id: "0002",
      },
      {
        type: "enumselect",
        field: "sex",
        value: "1",
        label: "性别",
        id: "0003",
        spread: {
          list: [
            { code: "1", name: "男" },
            { code: "2", name: "女" }
          ]
        }
      },
      {
        type: "text",
        field: "amount",
        value: "",
        label: "金额",
        id: "0004",
        spread: {
          rules: [
            { required: true, message: "金额不能不空" },
          ]
        },
      },
      {
        type: "text",
        field: "ratio",
        value: "",
        label: "百分比",
        id: "0005",
      },
      {
        type: "text",
        field: "projectDetail",
        value: "",
        label: "项目详情介绍",
        id: "0006",
        spread: {
          placeholder: "请输入项目详情",
        }
      },
    ],
  }

	componentDidMount() {
		// this.initFormData();
		// each(configRef, (item, id) => {
    //   searchList.push(item);
    // });
	}

	/**
	 * 初始化表单数据
	 */
	// initFormData = () => {
	// 	this.props.form.setFieldsValue({
			
	// 	});
	// };

	/**
	 * 提交
	 */
	submit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (err) {
				console.log("Form Values Error!!!");
				return;
      }
      console.log(values);
		});
  };
  
  /**
   * 渲染输入控件
   * @param {Object} 控件属性
   * @return {JSX}
   */
  inputRender = (config) => {
    const { getFieldDecorator } = this.props.form;
    const {
      type,
      field,
      value,
      label,
      spread = {},
    } = config;
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
          <Input type="textarea" row={4} {...inputProps()} />
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
    const formItemLayout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 14 }
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
		const { searchList } = this.state;
		return (
			<div>
				<h3>配置表单</h3>
				<Form layout="horizontal" onSubmit={this.submit}>
          <Row>
            {searchList && searchList.map((config, index)=> {
              return (
                <Col span={8} key={config.id || index}>{this.inputRender(config)}</Col>
              )
            })}
          </Row>
					<div style={{ textAlign: "right" }}>
						<Button
							type="primary"
							htmlType="submit"
							icon="search"
						>
							查询
						</Button>
            <Button
							type="ghost"
							htmlType="button"
              icon="delete"
              style={{marginLeft: 10}}
						>
							重置
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}
