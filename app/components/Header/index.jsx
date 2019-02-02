/**
 * 头部组件
 * @author ranguangyu
 * @date 2018-11-25
 */

import "./index.less";
import React from "react";
import { Menu, Icon, Affix, Popover, } from "antd";
import { withRouter } from "react-router";
import Cookie from "js-cookie";

@withRouter
export default class Header extends React.Component {

	state = {
		current: "home",
		navs: [
			{ code: "home", label: "Home", icon: "home" },
			{ code: "config", label: "Config", icon: "setting" },
			{ code: "form", label: "Form", icon: "form" },
			{ code: "list", label: "List", icon: "ordered-list" },
			{ code: "animate", label: "Animate", icon: "shake" },
			{ code: "mobx", label: "Mobx", icon: "snippets" }
		]
	};

	componentDidMount() {
		this.updateActive(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.updateActive(nextProps);
	}

	updateActive = (props) => {
		let pathname = props.location.pathname.slice(1);
		let pathList = pathname.split("/");
		let current = pathList[0];
		this.setState({ current });
	}

	render() {
		return (
			<Affix>
				<div className="header">
					<Menu
						onClick={(e) => this.setState({ current: e.key })}
						selectedKeys={[this.state.current]}
						mode="horizontal"
					>
						{this.state.navs.map(item => {
							return (
								<Menu.Item key={item.code}>
									<a href={`#/${item.code}`}><Icon type={item.icon} />
										{item.label}
									</a>
								</Menu.Item>
							)
						})}
					</Menu>
					{Cookie.get("userName") &&
						<div className="user-info">
							<Icon type="user" style={{marginRight: 5}} />
							<Popover
								placement="bottom"
								content={<a href="javascript:;" onClick={() => {
									Cookie.remove("userName");
									Cookie.remove("token");
									location.hash = "/login";
								}}>Logout</a>}
							>
								{Cookie.get("userName")}
							</Popover>
						</div>
					}
				</div>
			</Affix>
		)
	}
}
