import React from "react";
import { Form, Button, Input } from "antd";
import EnumSelect from "@components/EnumSelect";
import EnumChoice from "@components/EnumChoice";
import Tabs from "@components/Tabs";
import OriginForm from "./originForm";
import ConfigForm from "./configForm";

export default class MyForm extends React.Component {
	render() {
		return (
			<div>
				<h2>表单Demo</h2>
				<Tabs
					defaultActiveKey="2"
					panes={[
						{
							tab: "原生表单",
							key: "1",
							content: <OriginForm />
						},
						{
							tab: "配置表单",
							key: "2",
							content: <ConfigForm />
						}
					]}
				/>
			</div>
		)
	}
}
