import React from "react";
import { Form, Button } from "antd";
// import RichText from "@components/RichText";
import RichText from "@components/RichText/custom";

@Form.create()
export default class Page extends React.Component {

	state = {
		html: "",
	}

	render() {
		let { html } = this.state;
		let { text } = this.props.form.getFieldsValue();
		return (
			<div>
				<h2>富文本编辑器</h2>
				<Form.Item>
					<RichText
						{...this.props.form.getFieldProps("text", {
							rules: [
								{ required: true, message: "富文本内容不能为空" }
							]
						})}
					/>
				</Form.Item>
				<div style={{marginTop: 20}}>
					<Button
						type="primary"
						onClick={() => {
							console.log(text);
							// this.setState({ html: text });
            }}
					>
						提交
					</Button>
				</div>
				<div style={{marginTop: 20}}>
					<RichText value={html} readOnly />
				</div>
			</div>
		)
	}
}
