import React from 'react';
import { Table, Spin } from 'antd';
import { fetch } from '@utils';

export default class Home extends React.Component {

	state = {
		dataSource: [],
		total: 0,
		current: 1,
		loaded: false,
	};

	async componentDidMount() {
		await this.loadData(1);
	}

	/**
	 * 数据加载
	 * @param {Number} current 当前页码
	 */
	loadData = async (current) => {
		const result = await fetch({
			url: '/example/mock',
			data: {
				current,
			}
		});
		if(result.success) {
			const { projects, total } = result.data;
			this.setState({
				dataSource: projects,
				total,
				loaded: true,
			});
		}
	};

	/**
	 * 创建表格列模式
	 */
	createColumns = () => {
		return [
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
	};

	/**
	 * 创建分页器
	 */
	createPagination = () => {
		return {
			showQuickJumper: true,
			total: this.state.total,
			pageSize: 10,
			current: this.state.current,
			showSizeChanger: false,
			onChange: async (current) => {
				this.loadData(current);
				this.setState({ current });
			}
		}
	};

	render() {
		return (
			<div>
				<h2>Table List</h2>
				<Table
					rowKey={record => record.email}
					columns={this.createColumns()}
					dataSource={this.state.dataSource}
					pagination={this.createPagination()}
					loading={!this.state.loaded}
					locale={{ emptyText: '暂无数据' }}
				/>
			</div>
		)
	}
}
