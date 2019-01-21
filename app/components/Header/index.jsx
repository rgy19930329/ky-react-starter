import React from 'react';
import './index.less';

export default class Header extends React.Component {
	render() {
		return (
			<div className="header">
				Header
				<nav>
					<a href="#/home">home</a>
					<a href="#/config">config</a>
					<a href="#/form">form</a>
				</nav>
			</div>
		)
	}
}
