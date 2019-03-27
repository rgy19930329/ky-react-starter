import React from "react";
import { Form, DatePicker } from "antd";
import EnumSelect from "@components/EnumSelect";
import EditTable from "@components/EditTable";
import moment from "moment";

@Form.create()
class PageEditTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: [
				{ name: "rgy", sex: "男", birthday: "1993-03-29" }
			],
		}
	}

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
				component: EnumSelect,
				render: (text, record, index, getProps) => {
					return (
						<EnumSelect
							style={{width: 100}}
							list={["男", "女"]}
							{...getProps({
								rules: [
									{ required: true },
								],
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
					console.log(text);
					let opts = text ? {
						initialValue: moment(text),
					} : {};
					return (
						<DatePicker
							{...getProps({
								...opts,
								// getValueFromEvent: (value) => {
								// 	console.log(moment(value).format("YYYY-MM-DD"));
								// 	return moment(value).format("YYYY-MM-DD");
								// }
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
					hasSN={true}
					columns={this.createColumns()}
					dataSource={this.state.dataSource}
					onChange={(dataSource, { index, record, type, }) => {
						console.log(dataSource, record, index, type);
						this.setState({ dataSource });
					}}
				/>
			</div>
		)
	}
}

export default PageEditTable;
