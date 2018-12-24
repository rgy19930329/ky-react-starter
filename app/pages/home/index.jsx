import React from 'react';
import { Button } from 'antd';
import { fetch } from '@utils';

export default class Home extends React.Component {

	getList = async () => {
		const result = await fetch({
			url: '/example/mock'
		});
		console.log(result);
	};

	render() {
		return (
			<div>
        <div>welcome to home</div>
				<Button type="primary" onClick={this.getList}>点击</Button>
      </div>
		)
	}
}
