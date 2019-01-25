/**
 * 头部组件
 * @author ranguangyu
 * @date 2018-11-25
 */

import './index.less';
import React from 'react';
import { Menu, Icon, } from 'antd';

export default class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<Menu
					mode="horizontal"
				>
					<Menu.Item key="home">
						<a href="#/home"><Icon type="home" /> Home</a>
					</Menu.Item>
					<Menu.Item key="config">
						<a href="#/config"><Icon type="setting" /> Config</a>
					</Menu.Item>
					<Menu.Item key="form">
						<a href="#/form"><Icon type="form" /> Form</a>
					</Menu.Item>
					<Menu.Item key="list">
						<a href="#/list"><Icon type="ordered-list" /> List</a>
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}
