import React from "react";
import { Form, Button, Input } from "antd";
import EnumSelect from "@components/EnumSelect";
import EnumChoice from "@components/EnumChoice";
import { fetch } from "@utils";
import { each, add } from "@utils/wdio";

const ref = new Wilddog("https://kylin.wilddogio.com/test");
const usersRef = ref.child("users");

@Form.create()
export default class OriginForm extends React.Component {

	componentDidMount() {
		this.initFormData();
		each(usersRef, (item, id) => {
			console.log(id, item);
		});
	}

	/**
	 * 初始化表单数据
	 */
	initFormData = () => {
		this.props.form.setFieldsValue({
			name: "rgy",
			age: 25,
			type: "2",
			identity: "002",
			fruit: ["003", "004"],
		});
	};

	/**
	 * 新增数据
	 */
	addOne = (item = {}) => {
		console.log(item);
		add(usersRef, item);
	};

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
			this.addOne(values);
		});
	};

	/**
	 * 组装goods数据
	 * @param {Object} data
	 */
	fixGoods = (data) => {
		const list = data.result || [];
		return list.map(item => {
			return {
				code: item[1],
				name: item[0]
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		}
		return (
			<div>
				<h3>原生表单</h3>
				<Form layout="horizontal" onSubmit={this.submit}>
					<Form.Item {...formItemLayout} label="Name">
						{getFieldDecorator("name", {
							rules: [{
								required: true,
								message: "Please input your name",
							}],
						})(
							<Input placeholder="Please input your name" />
						)}
					</Form.Item>
					<Form.Item {...formItemLayout} label="Age">
						{getFieldDecorator("age", {
							rules: [{
								required: true,
								message: "Please input your age",
							}],
						})(
							<Input placeholder="Please input your age" />
						)}
					</Form.Item>
					<Form.Item {...{
						labelCol: { span: 4 },
						wrapperCol: { span: 20 }
					}} label="Type">
						{getFieldDecorator("type")(
							<EnumChoice.Radio list={[
								{ code: "1", name: "type A" },
								{ code: "2", name: "type B" },
							]} />
						)}
					</Form.Item>
					<Form.Item {...{
						labelCol: { span: 4 },
						wrapperCol: { span: 4 }
					}} label="Identity">
						{getFieldDecorator("identity")(
							<EnumSelect
								placeholder="请选择"
								promiseCondition={this.props.form.getFieldValue("type") || "2"}
								createPromise={() => fetch({
									url: "/example/identifyType",
									data: {
										type: this.props.form.getFieldValue("type") || "2",
									}
								}).then(res => res.data.list || [])}
							/>
						)}
					</Form.Item>
					<Form.Item {...formItemLayout} label="Fruits">
						{getFieldDecorator("fruit")(
							<EnumChoice.Checkbox
								createPromise={() => fetch({
									url: "/example/fruits",
								}).then(res => res.data.list || [])}
							/>
						)}
					</Form.Item>
					<Form.Item {...{
						labelCol: { span: 4 },
						wrapperCol: { span: 12 }
					}} label="Goods">
						{getFieldDecorator("goods")(
							<EnumSelect
								mode="multiple"
								showSearch
								placeholder="请输入您要搜索的商品"
								labelInValue
								searchPromise={(value) => fetch({
									url: "/sug",
									data: {
										code: "utf-8",
										q: value,
									}
								}).then(res => {
									return this.fixGoods(res);
								})}
							/>
						)}
					</Form.Item>
					<Form.Item {...{
						labelCol: { span: 4 },
						wrapperCol: { span: 12 }
					}} label="Novels">
						{getFieldDecorator("novel")(
							<EnumSelect
								showSearch
								placeholder="请输入您要搜索的小说"
								searchPromise={(value) => fetch({
									url: "/novelSearchApi",
									data: {
										name: value,
									}
								}).then(res => {
									return res.data || [];
								})}
							/>
						)}
					</Form.Item>
					<div style={{ textAlign: "right" }}>
						<Button
							type="primary"
							htmlType="submit"
							icon="check-circle"
						>
							提交
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}
