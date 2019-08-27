import React from "react";
// import SubChild from "./subChild";
import ContextTest from "@components/ContextTest";
// import RInput from "@components/RInput";

export default class Child extends React.Component {

  render() {
    return (
      <div>
        {/* <SubChild></SubChild> */}
        <ContextTest></ContextTest>
        {/* <RInput></RInput> */}
      </div>
    )
  }
}