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
import ListDetail from "@pages/list/detail";
import Animate from "@pages/animate";
import Mobx from "@pages/mobx";
import MyEcharts from "@pages/echarts";
import PageEditTable from "@pages/edit-table";

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
            <AuthRouter path="/edit-table" component={PageEditTable} />
            <AuthRouter path="/echarts" component={MyEcharts} />
            <AuthRouter path="/mobx" component={Mobx} />
            <AuthRouter path="/animate" component={Animate} />
            <AuthRouter path="/detail/:id" component={ListDetail} />
            <AuthRouter path="/list" component={List} />
            <AuthRouter path="/form" component={MyForm} />
            <AuthRouter path="/config" component={Config} />
            <AuthRouter path="/home" component={Home} />
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