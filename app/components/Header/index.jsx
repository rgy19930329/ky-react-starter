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
import { fetch } from "@utils";

@withRouter
export default class Header extends React.Component {

	state = {
		current: "home",
		navs: [],
	};

	componentDidMount() {
		this.getNavs();
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

	getNavs = async () => {
		const result = await fetch({
			url: "/example/navs",
		});
		if (result.code === "0000") {
			this.setState({ navs: result.data });
		}
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
									location.href = "/";
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
