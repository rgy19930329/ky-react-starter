import './index.less';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from '@components/Header';
import AnimateRouter from '@components/AnimateRouter';
import { Provider } from 'mobx-react';
import store from '@stores';

export default class App extends React.Component {
	render() {
		return (
			<Provider {...store}>
				<HashRouter>
						<div>
						<Header />
						<div style={{padding: 20}}>
							<AnimateRouter />
						</div>
						</div>
				</HashRouter>
			</Provider>
		)
	}
}
