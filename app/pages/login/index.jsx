import "./index.less";
import React from "react";
import { Form, Input, Button, Icon } from "antd";
import { fetch } from "@utils";
import Cookie from "js-cookie";

@Form.create()
export default class Login extends React.Component {
	state = {
		loaded: true,
	}

	handleSubmit = (e) => {
		e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
				this.setState({ loaded: false });
				const result = await fetch({
					url: "/example/login",
					data: values
				});
				this.setState({ loaded: true });
				if(result.code === "0000") {
					const { token, userName } = result.data;
					Cookie.set("token", token);
					Cookie.set("userName", userName);
					location.href = "/";
				}
      }
    });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="wrap-login">
				<h2 style={{marginBottom: 20}}>Login</h2>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator("userName", {
							rules: [{ required: true, message: "Please input your username!" }],
						})(
							<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("password", {
							rules: [{ required: true, message: "Please input your Password!" }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />
						)}
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{width: "100%"}}
							loading={!this.state.loaded}
						>
							Log in
          	</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}
