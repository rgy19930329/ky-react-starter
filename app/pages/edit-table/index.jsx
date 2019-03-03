import React from "react";
import { DatePicker } from "antd";
import EnumSelect from "@components/EnumSelect";
import EditTable from "@components/EditTable";

export default class PageEditTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: [],
		}
	}

	createColumns = () => {
		return [
			{
				title: "姓名",
				dataIndex: "name",
				key: "name",
				editable: true,
			},
			{
				title: "性别",
				dataIndex: "sex",
				key: "sex",
				editable: true,
				component: EnumSelect,
				options: {
					style: { width: 100 },
					list: ["男", "女"],
				},
			},
			{
				title: "出生日期",
				dataIndex: "birthday",
				key: "birthday",
				editable: true,
				component: DatePicker,
				options: {
					onChange: (date, dateString) => {
						console.log(dateString);
						return dateString;
					}
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
					onChange={(list, { index, record, type, }) => {
						console.log(list, record, index, type);
					}}
				/>
			</div>
		)
	}
}
