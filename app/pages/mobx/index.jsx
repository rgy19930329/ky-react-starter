import React from 'react';
import { Input } from 'antd';
import Todobox from './TodoBox';
import { observer, inject } from 'mobx-react';

@inject("todoListStore")
@observer
export default class Mobx extends React.Component {
	state = {
		task: "",
	}

	render() {
		const { todoListStore } = this.props;
		return (
			<div style={{
				width: 400,
				border: "1px solid #ddd",
				padding: 10,
				margin: "0 auto",
			}}>
				<h2 className="tc">TodoList</h2>
				<div style={{paddingBottom: 10}}>
					<Input
						size="small"
						value={this.state.task}
						onChange={(e) => {
							this.setState({
								task: e.target.value,
							});
						}}
						onKeyUp={(e) => {
							if(e.keyCode === 13) {
								todoListStore.add({
									desc: this.state.task,
									status: "unfinished",
								});
								this.setState({
									task: "",
								});
							}
						}}
					/>
				</div>
				<Todobox
					title="进行中"
					status="unfinished"
				/>
				<Todobox
					title="已完成"
					status="finished"
				/>
			</div>
		)
	}
}
