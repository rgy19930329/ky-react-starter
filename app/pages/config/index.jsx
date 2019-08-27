import React from "react";
import PropTypes from "prop-types";
import { Spin, Form } from "antd";
import { fetch } from "@utils";
import Child from "./child";
import RInput from "@components/RInput";
import { Section } from "nice-ui";

@Form.create()
export default class Config extends React.Component {

	static childContextTypes = {
		title: PropTypes.string,
		form: PropTypes.object,
	};

	getChildContext() {
		return {
			title: "ranguangyu",
			form: this.props.form,
		}
	}

	state = {
		count: null,
		filters: {},
		loading: true,
	};

	async componentDidMount() {
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
		const { getFieldDecorator } = this.props.form;
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
				<Section title="测试 context 传值">
					<Child></Child>
				</Section>
				<Section title="测试 RInput 组件">
					{getFieldDecorator("name", {
						rules: [
							{ required: true, message: "值不能不空" },
						]
					})(
						<RInput style={{width: 200}} />
					)}
				</Section>
			</div>
		)
	}
}
