import React from "react";
import Tabs from "@components/Tabs";
import Label from "@components/Label";
import { Row, Col, } from "antd";
import { fetch } from "@utils";

export default class ListDetail extends React.Component {

	state = {
		data: {},
		loaded: false,
	};

	async componentDidMount() {
		await this.loadData();
	}

	/**
	 * 数据加载
	 */
	loadData = async () => {
		const {
			match: {
				params: { id }
			}
		} = this.props;
		const result = await fetch({
			url: "/example/mock/detail",
			data: {
				id,
			}
		});
		if (result.code === "0000") {
			this.setState({
				data: result.data,
				loaded: true,
			});
		}
	};

	render() {
		const {
			address,
			email,
			id,
			number,
			paragraph,
			string,
		} = this.state.data;
		return (
			<div>
				<h2>Detail Info</h2>
				<Tabs
					panes={[
						{
							tab: "style1",
							key: "1",
							content: (
								<Row>
									<Col span={6}><Label title="name" value={string} /></Col>
									<Col span={6}><Label title="email" value={email} /></Col>
									<Col span={6}><Label title="age" value={number} /></Col>
									<Col span={6}><Label title="address" value={address} /></Col>
									<Col span={24}><Label title="paragraph" value={paragraph} isLongText /></Col>
								</Row>
							)
						},
						{
							tab: "style2",
							key: "2",
							content: (
								<div>
									<h5>{id}</h5>
									<div>name: {string}</div>
									<div>email: {email}</div>
									<div>age: {number}</div>
									<div>address: {address}</div>
									<div>paragraph: {paragraph}</div>
								</div>
							)
						}
					]}
				/>
			</div>
		)
	}
}
