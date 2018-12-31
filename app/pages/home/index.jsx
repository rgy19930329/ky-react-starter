import React from 'react';
import { Button, Table } from 'antd';
import { fetch } from '@utils';

const columns = [
	{
		title: 'name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'string',
		dataIndex: 'string',
		key: 'string',
	},
	{
		title: 'age',
		dataIndex: 'number',
		key: 'number',
	}
];

export default class Home extends React.Component {

	state = {
		dataSource: [],
	};

	getList = async () => {
		const result = await fetch({
			url: '/example/mock'
		});
		if(result.success) {
			this.setState({
				dataSource: result.data.projects,
			});
		}
	};

	render() {
		const { dataSource } = this.state;
		return (
			<div>
				<div>welcome to home</div>
				<Button type="primary" onClick={this.getList}>点击</Button>
				<div>
					<Table
						rowKey={record => record.email}
						dataSource={dataSource}
						columns={columns} />
				</div>
			</div>
		)
	}
}
