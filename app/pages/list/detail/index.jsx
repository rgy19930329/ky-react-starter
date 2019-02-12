import React from "react";
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
		if(result.code === "0000") {
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
				<h5>{id}</h5>
				<div>name: {string}</div>
				<div>email: {email}</div>
				<div>age: {number}</div>
				<div>address: {address}</div>
				<div>paragraph: {paragraph}</div>
			</div>
		)
	}
}
