/**
 * 权鉴路由组件
 * @author ranguangyu
 * @date 2019-2-2
 */

import React from "react";
import { Route } from "react-router-dom";
import NotAuthorized from "@components/NotAuthorized";
import { observer, inject } from "mobx-react";

@inject("authStore")
@observer
class AuthRouter extends React.Component {
  getAuth = () => {
    const currentPath = this.props.path;
    const authList = this.props.authStore.authList;
    for (let i = 0, len = authList.length; i < len; i++) {
      if (this.routerMatch(currentPath, authList[i].path)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 路由匹配规则
   * @param {String} currentPath
   * @param {String} authPath
   * @return {Boolen}
   */
  routerMatch = (currentPath, authPath) => {
    if(currentPath == authPath) {
      return true;
    }
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