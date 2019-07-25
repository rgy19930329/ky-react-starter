/**
 * @desc 组件 - HOCAsync
 * @author rgy
 * @date 2019-07-25 15:58:38
 */

import React from "react";

export default importComponent => class HOCAsync extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  async componentDidMount() {
    if (this.hasLoadedComponent()) {
      return;
    }
    const { default: component } = await importComponent();
    this.setState({
      component: component
    });
  }

  hasLoadedComponent() {
    return this.state.component !== null;
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }
  }

  render() {
    const C = this.state.component;

    return C ? <C {...this.props} /> : null;
  }
}
