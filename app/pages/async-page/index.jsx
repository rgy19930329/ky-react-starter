/**
 * @desc 页面 - AsyncPage
 * @author rgy
 * @date 2019-07-25 11:21:40
 */

import React from "react";

export default class AsyncPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-async-page-wrapper">
        我是按需加载的路由页面
      </div>
    )
  }
}
