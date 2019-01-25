import './index.less';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from '@components/Header';
import Home from './home';
import Config from './config';
import MyForm from './form';
import List from './list';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div style={{padding: 20}}>
					<HashRouter>
						<Switch>
							<Route path="/list" component={List} />
							<Route path="/form" component={MyForm} />
							<Route path="/config" component={Config} />
							<Route path="/home" component={Home} />
							<Route path="/" component={Home} />
						</Switch>
					</HashRouter>
				</div>
			</div>
		)
	}
}

render(<App /> , document.getElementById('app'));
