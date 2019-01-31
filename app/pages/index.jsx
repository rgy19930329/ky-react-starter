import './index.less';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from '@components/Header';
import AnimateRouter from '@components/AnimateRouter';

export default class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Header />
					<div style={{padding: 20}}>
						<AnimateRouter />
					</div>
				</div>
			</HashRouter>
		)
	}
}
