import React from 'react';
import { render } from 'react-dom';
import './index.less';

export default class Header extends React.Component {
	render() {
		return (
			<div className="header">
				Header 
				<nav>
					<a href="#/home">home</a>
					<a href="#/config">config</a>
				</nav>
			</div>
		)
	}
}
