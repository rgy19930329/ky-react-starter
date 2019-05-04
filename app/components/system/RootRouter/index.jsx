/**
 * 根路由组件
 * @author ranguangyu
 * @date 2019-2-2
 */

import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import AnimateRouter from "@components/system/AnimateRouter";
import { observer, inject } from "mobx-react";
import Header from "@components/Header";
import Login from "@pages/login";
import Cookie from "js-cookie";

@withRouter
@inject("authStore")
@observer
class RootRouter extends React.Component {
  componentDidMount() {
    this.props.authStore.load();
  }

  render() {
    const location = this.props.location;
    let token = Cookie.get("token");
    if (!token) {
      return (
        <div>
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </div>
      )
    } else {
      if (location.pathname === "/login") {
        return (
          <Route path="/login" component={Login} />
        )
      } else {
        return (
          <div>
            <Header />
            <div style={{ padding: 20 }}>
              <AnimateRouter />
            </div>
          </div>
        )
      }
    }
  }
}

export default RootRouter;