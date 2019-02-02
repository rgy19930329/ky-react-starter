/**
 * 动画路由组件
 * @author ranguangyu
 * @date 2019-01-31
 */

import "./index.less";
import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import AuthRouter from "@components/AuthRouter";

import NotFound from "@components/NotFound";
import Home from "@pages/home";
import Config from "@pages/config";
import MyForm from "@pages/form";
import List from "@pages/list";
import Animate from "@pages/animate";
import Mobx from "@pages/mobx";

@withRouter
class AnimateRouter extends React.Component {
  render() {
    const location = this.props.location;
    return (
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="message"
        >
          <Switch location={location}>
            <AuthRouter path="/mobx" component={Mobx} />
            <Route path="/animate" component={Animate} />
            <Route path="/list" component={List} />
            <Route path="/form" component={MyForm} />
            <Route path="/config" component={Config} />
            <Route path="/home" component={Home} />
            {/* <Route path="/" exact={true} component={Home} /> */}
            <Redirect from="/" exact={true} to="/home" />
            <Route path="*" component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default AnimateRouter;