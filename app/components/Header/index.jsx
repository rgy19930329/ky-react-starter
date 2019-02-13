/**
 * 头部组件
 * @author ranguangyu
 * @date 2018-11-25
 */

import "./index.less";
import React from "react";
import { Menu, Icon, Affix, Popover, } from "antd";
import { withRouter } from "react-router";
import { observer, inject } from "mobx-react";
import Cookie from "js-cookie";
import { fetch } from "@utils";

@withRouter
@inject("authStore")
@observer
export default class Header extends React.Component {

	state = {
		current: "home",
		navs: [],
	};

	timer = null;

	componentDidMount() {
		this.getNavs();
		this.updateActive(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.updateActive(nextProps);
	}

	updateActive = (props) => {
		const pathname = props.location.pathname;
		const { authList } = props.authStore;
		let current = pathname.slice(1);
		if (authList.length === 0) {
			this.timer = setInterval(() => {
				this.updateActive(props);
			}, 300);
			return;
		} else {
			this.timer && clearInterval(this.timer);
			for (let i = 0, len = authList.length; i < len; i++) {
				if (pathname === authList[i].path) {
					current = pathname.slice(1);
					break;
				} else if (this.routerMatch(pathname, authList[i].path)) {
					current = authList[i].parentPath.slice(1);
					break;
				}
			}
			this.setState({ current });
		}
	}

	/**
	 * 路由匹配
	 * @param {String} currentPath 当前路由 /detail/123456
	 * @param {String} targetPath 目标路由规则 /detail/:id
	 * @return {Boolean}
	 */
	routerMatch = (currentPath, targetPath) => {
		const rule = targetPath.replace(/:\w+/, "\\w+");
		const regx = new RegExp(`^${rule}$`);
		if (currentPath.match(regx)) {
			return true;
		}
		return false;
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
							<Icon type="user" style={{ marginRight: 5 }} />
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
