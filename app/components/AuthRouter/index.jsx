/**
 * 权鉴路由组件
 * @author ranguangyu
 * @date 2019-2-2
 */

import React from "react";
import { Route } from "react-router-dom";
import NotAuthorized from "@components/NotAuthorized";

class AuthRouter extends React.Component {
  getAuth = () => {
    return false;
  }

  render() {
    return (
      this.getAuth()
      ? <Route {...this.props} />
      : <Route {...this.props} component={NotAuthorized} />
    )
  }
}

export default AuthRouter;