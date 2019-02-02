/**
 * TodoBox 组件
 * @author ranguangyu
 * @date 2019-2-1
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import { Badge, Icon } from "antd";
import { observer, inject } from "mobx-react";

@inject("todoListStore")
@observer
export default class TodoBox extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
    isOpen: PropTypes.bool,
  }

  static defaultProps = {
    title: "默认标题",
    status: "unfinished", // unfinished: 未完成 | finished: 已完成
    isOpen: true,
  }

  state = {
    isOpen: this.props.status === "unfinished" ? true : false,
  }

  getList = () => {
    const { todoListStore: { dataSource }, status } = this.props;
    return dataSource.filter(item => item.status === status);
  }

  render() {
    const {
      title,
      status,
      todoListStore: { dataSource },
      todoListStore,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="todobox">
        <h3 className="clearfix">
          <span style={{ marginRight: 10 }}>{title}</span>
          {status === "finished" ?
            <Badge count={this.getList().length} style={{ backgroundColor: "#52c41a" }} /> :
            <Badge count={this.getList().length} />
          }
          <a href="javascript:;" className="fr" onClick={() => {
            this.setState({
              isOpen: !this.state.isOpen,
            });
          }}>
            <Icon type={isOpen ? "minus" : "plus"} />
          </a>
        </h3>
        <ul className={`todobox-ul ${isOpen ? "active" : ""}`}>
          {dataSource.map((item, index) => {
            if (item.status === status) {
              return (
                <li key={String(index)} className="todobox-li clearfix">
                  {item.desc}
                  {status === "unfinished" &&
                    <a href="javascript:;" className="fr" onClick={() => {
                      todoListStore.done(index);
                    }}>done</a>
                  }
                </li>
              )
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    )
  }
}
