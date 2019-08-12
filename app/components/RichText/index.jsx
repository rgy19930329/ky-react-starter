/**
 * RichText 富文本编辑器
 * @author ranguangyu
 * @date 2019-6-4
 */

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default class RichText extends React.Component {
  static defaultProps = {
    value: "",
    onChange: () => {},
    height: 300,
    modules: {
      toolbar: [
        [{ "header": [1, 2, 3, 4, false] }, { "color": [] }, { "background": [] }],
        [{ "align": [] }, { "list": "ordered" }, { "list": "bullet" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        ["link", "image", "code-block"],
        ["clean"]
      ],
    },
    formats: [
      "header", "color", "background",
      "align", "list",
      "bold", "italic", "underline", "strike", "blockquote",
      "link", "image", "code-block",
    ]
  }

  render() {
    let { height } = this.props;
    return (
      <div style={{height: height}}>
        <ReactQuill
          style={{height: height - 42}}
          {...this.props}
        />
      </div>
    )
  }
}
