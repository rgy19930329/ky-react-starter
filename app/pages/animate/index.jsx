import "./index.less";
import React from "react";
import { Button } from "antd";
import QueueAnim from "rc-queue-anim";
import { fetch } from "@utils";
import { CSSTransition } from "react-transition-group";

export default class Animate extends React.Component {
	state = {
		list: [],
		star: false,
	};

	async componentDidMount () {
		const result = await fetch({
			url: "/example/fruits",
		});
		this.setState({
			list: result.data.list,
		});
	}

	render() {
		return (
			<div className="wrap-animate">
        <h2>动画</h2>
				<div>
					<ul>
						<QueueAnim>
							{this.state.list.map(item => {
								return (
									<li key={item.code}>{item.name}</li>
								)
							})}
						</QueueAnim>
					</ul>
				</div>
				<hr />
				<div>
					<Button onClick={() => {
						this.setState({
							star: !this.state.star
						});
					}}>press</Button>
					<CSSTransition
						in={this.state.star}
						timeout={300}
						classNames="star"
						unmountOnExit
					>
						<div className="star">⭐</div>
					</CSSTransition>
				</div>
      </div>
		)
	}
}
