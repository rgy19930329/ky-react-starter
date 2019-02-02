import React from "react";
import { Spin } from "antd";
import { fetch } from "@utils";

export default class Config extends React.Component {
	state = {
		count: null,
		filters: {},
		loading: true,
	};

	async componentDidMount () {
		let result = await fetch({
			url: "https://api.football-data.org/v2/matches",
			headers: {
				"X-Auth-Token": "a19cd479f22d46899ff4d0ae52dc6dfc"
			}
		});
		const { count, filters } = result;
		this.setState({
			count,
			filters,
			loading: false,
		});
	}

	render() {
		const { loading, count, filters: { dateFrom, dateTo, permission } } = this.state;
		return (
			<div>
        <h2>配置</h2>
				<Spin spinning={loading}>
					<div>
						<div>count: {count}</div>
						<div>dateFrom: {dateFrom}</div>
						<div>dateTo: {dateTo}</div>
						<div>permission: {permission}</div>
					</div>
				</Spin>
      </div>
		)
	}
}
