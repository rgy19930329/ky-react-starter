import React from "react";
import { Form, DatePicker, Button, Input, message, } from "antd";
import EnumSelect from "@components/EnumSelect";
import EditTable from "@components/EditTable";
import moment from "moment";

@Form.create()
class PageEditTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: [
				{ name: "rgy", sex: "男", age: "25", birthday: "1993-03-29" }
			],
			validateCondition: 0,
		}
	}

	/**
	 * 创建列模式
	 */
	createColumns = () => {
		return [
			{
				title: "姓名",
				dataIndex: "name",
				key: "name",
			},
			{
				title: "性别",
				dataIndex: "sex",
				key: "sex",
				render: (text, record, index, getProps) => {
					return (
						<EnumSelect
							style={{width: 100}}
							list={["男", "女"]}
							{...getProps({
								rules: [
									{ required: true, message: "性别必填" },
								],
							})}
							allowClear
						/>
					)
				}
			},
			{
				title: "年龄",
				dataIndex: "age",
				key: "age",
				render: (text, record, index, getProps) => {
					return (
						<Input
							{...getProps({
								rules: [
									{ required: true, message: "年龄必填" },
									{ validator: (rule, value, callback) => {
										if (!value.match(/^[1-9]\d*$/)) {
											callback("年龄格式有误");
											return;
										}
										callback();
									} }
								]
							})}
						/>
					)
				}
			},
			{
				title: "出生日期",
				dataIndex: "birthday",
				key: "birthday",
				render: (text, record, index, getProps) => {
					let opts = text ? {
						initialValue: moment(text),
					} : {};
					return (
						<DatePicker
							{...getProps({
								...opts,
							})}
						/>
					)
				}
			},
		];
	}

	render() {
		return (
			<div>
				<h2>可编辑表格</h2>
				<EditTable
					id="et1"
					context={this}
					hasSN={true}
					columns={this.createColumns()}
					dataSource={this.state.dataSource}
				/>
				<EditTable
					id="et2"
					context={this}
					hasSN={true}
					columns={this.createColumns()}
					dataSource={this.state.dataSource}
				/>
				<div className="handler">
					<Button
						type="primary"
						onClick={async () => {
							Promise.all([
								this["et1"].doSubmit(),
								this["et2"].doSubmit(),
							]).then(results => {
								console.log(results);
								console.log("校验通过，允许提交");
							}).catch(e => {
								console.error("校验失败");
							});
						}}
					>
						提交
					</Button>
				</div>
			</div>
		)
	}
}

export default PageEditTable;
