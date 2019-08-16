import "./global.less";
import React from "react";
import { render } from "react-dom";
import App from "./pages/index";
import { AppContainer } from "react-hot-loader"; // 敲黑板

const toRender = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("app")
  );
}

toRender(App);

if (module.hot) {
  module.hot.accept("./pages/index", () => {
    // 这里要用require方式引入，直接toRender(App) 不生效
    toRender(require("./pages/index").default);
  });
}