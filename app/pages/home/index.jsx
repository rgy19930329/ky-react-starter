import "./index.less";
import React from "react";
import { Button } from "antd";

export default class Home extends React.Component {

	state = {
		count: 0,
	};

	render() {
		return (
			<div className="page-home-wrapper">
				<h2>Welcome to Home {this.state.count}</h2>
				<div>
					<Button onClick={() => {
						this.setState({
							count: this.state.count + 1,
						});
					}}>welcome</Button>
				</div>
			</div>
		)
	}
}
