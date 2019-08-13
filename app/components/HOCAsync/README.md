# 组件 - HOCAsync

## 功能描述

> 高阶组件 - 按需加载

## 参数说明

## 组件使用

```javascript
import HOCAsync from "@components/HOCAsync";
import { Route } from "react-router-dom";

const AsyncPage = HOCAsync(() => import("@pages/async-page"));

<Route path="/async-page" component={AsyncPage} />
```