# 组件 - HOCLoading

## 功能描述

> 高阶组件 - 为组件添加数据加载Loading

## 参数说明

```
mode: "part"（默认）, "all"
```

## 组件使用

```javascript
import HOCLoading from "@components/HOCLoading";

@HOCLoading()
export default class EnumRadio extends React.Component {

  state = {
    loaded: false,
  };

  componentDidMount() {
    const { createPromise } = this.props;
    createPromise && this.load(createPromise());
  }

  componentWillReceiveProps(nextProps) {
    const { createPromise } = nextProps;
    if(this.props.promiseCondition !== nextProps.promiseCondition) {
      createPromise && this.load(createPromise());
    }
  }

  load = async (enumPromise) => {
    this.setState({ loaded: false });
    const list = await enumPromise;
    if (list.length > 0) {
      this.setState({ list });
    }
    this.setState({ loaded: true });
  }
}
//
import HOCLoading from "nice-ui";

@HOCLoading("all")
export default class EnumRadio extends React.Component {
  state = {
    loaded: false,
  };
}
//
import HOCLoading from "nice-ui";

class EnumRadio extends React.Component {
  state = {
    loaded: false,
  };
}

export default HOCLoading("all")(EnumRadio);
```