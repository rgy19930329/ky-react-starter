/**
 * Tabs 组件
 * @author ranguangyu
 * @date 2019-5-1
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

export default class CustomTabs extends React.Component {
  static propTypes = {
    panes: PropTypes.array,
  }

  static defaultProps = {
    panes: [],
  }

  render() {
    const { panes } = this.props;
    return (
      <Tabs
        type="card"
        {...this.props}
      >
        {panes && panes.map((item, index) => {
          const { tab, content, key = index } = item;
          return (
            <TabPane tab={tab} key={key}>{content}</TabPane>
          )
        })}
      </Tabs>
    )
  }
}