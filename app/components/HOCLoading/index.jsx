/**
 * HOC loading 组件
 * @author ranguangyu
 * @date 2019-01-30
 */

import React from 'react';
import { Spin, Icon } from 'antd';

export default (WrappedComponent) => {
	return class extends WrappedComponent {
    render() {
      return !this.state.loaded ?
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 20 }} spin />}
          spinning={!this.state.loaded} 
        /> :
        super.render();
    }
  }
}
