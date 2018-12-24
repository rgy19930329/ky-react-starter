import React from 'react';
import { Button } from 'antd';

export default class Home extends React.Component {
	render() {
		return (
			<div>
        <div>welcome to home</div>
				<Button type="primary" onClick={() => {
					console.log('perss');
				}}>点击</Button>
      </div>
		)
	}
}
