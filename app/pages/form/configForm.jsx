import React from "react";
import { Form, Button, Row, Col, } from "antd";
import { each, add } from "@utils/wdio";
import ConfigForm from "@components/ConfigForm";

const ref = new Wilddog("https://kylin.wilddogio.com/test");
const configRef = ref.child("configPage");
const searchListRef = configRef.child("searchList");

@Form.create()
export default class ConfigFormPage extends React.Component {

  state = {
    searchList: [],
  }

	componentDidMount() {
    let { searchList } = this.state;
		each(searchListRef, (item) => {
      searchList.push(item);
      this.setState({ searchList });
    });
    setTimeout(() => {
      this.initFormData();
    }, 1000);
  }

  initFormData = () => {
    this.props.form.setFieldsValue({
      age: 24,
    });
  }

  submit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        console.log("Error in Form");
        return;
      }
      console.log(values);
    });
  }

	render() {
		const { searchList } = this.state;
		return (
			<div>
				<h3>配置表单</h3>
				<Form layout="horizontal" onSubmit={this.submit}>
          <ConfigForm
            configList={searchList}
            upForm={this.props.form}
          />
					<div style={{ textAlign: "right" }}>
            <Button
							type="primary"
							htmlType="submit"
							icon="check-circle"
						>
							提交
						</Button>
						{/* <Button
							type="primary"
							htmlType="submit"
							icon="search"
						>
							查询
						</Button>
            <Button
							type="ghost"
							htmlType="button"
              icon="delete"
              style={{marginLeft: 10}}
						>
							重置
						</Button> */}
					</div>
				</Form>
			</div>
		)
	}
}
