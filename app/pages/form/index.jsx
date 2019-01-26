import React from 'react';
import { Form, Button, Input, Radio } from 'antd';
import EnumSelect from '@components/EnumSelect';
import EnumRadio from '@components/EnumRadio';
import { fetch } from '@utils';

@Form.create()
export default class MyForm extends React.Component {

	componentDidMount() {
		this.initFormData();
	}

	initFormData = () => {
		this.props.form.setFieldsValue({
			name: 'rgy',
			age: 25,
			type: '2',
			identity: '002',
		});
	};

	submit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (err) {
				console.log('Form Values Error!!!');
				return;
			}
			console.log(values);
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		}
		return (
			<div>
				<h2>表单</h2>
				<Form layout="horizontal" onSubmit={this.submit}>
					<Form.Item {...formItemLayout} label="Name">
						{getFieldDecorator('name', {
							rules: [{
								required: true,
								message: 'Please input your name',
							}],
						})(
							<Input placeholder="Please input your name" />
						)}
					</Form.Item>
					<Form.Item {...formItemLayout} label="Age">
						{getFieldDecorator('age', {
							rules: [{
								required: true,
								message: 'Please input your age',
							}],
						})(
							<Input placeholder="Please input your age" />
						)}
					</Form.Item>
					<Form.Item {...{
						labelCol: { span: 4 },
						wrapperCol: { span: 20 }
					}} label="Type">
						{getFieldDecorator('type')(
							<EnumRadio list={[
								{ code: '1', name: 'type A' },
								{ code: '2', name: 'type B' },
							]} />
						)}
					</Form.Item>
					<Form.Item {...{
						labelCol: { span: 4 },
						wrapperCol: { span: 4 }
					}} label="Identity">
						{getFieldDecorator('identity')(
							<EnumSelect
								placeholder="请选择"
								promiseCondition={this.props.form.getFieldValue('type')}
								createPromise={() => fetch({
									url: "/example/identifyType",
									data: {
										type: this.props.form.getFieldValue('type'),
									}
								}).then(res => res.data.list || [])}
							/>
						)}
					</Form.Item>
					<div style={{textAlign: 'right'}}>
						<Button
							type="primary"
							htmlType="submit">
							console
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}
