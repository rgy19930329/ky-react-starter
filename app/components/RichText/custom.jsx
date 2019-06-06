/**
 * RichText 富文本编辑器
 * @author ranguangyu
 * @date 2019-6-5
 */

import "./custom.less";
import React from "react";
import { Icon, Modal, Upload, message } from "antd";
import uniqueid from "uniqueid";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const uuid = uniqueid("toolbar-");

/**
 * 注册字号
 */
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "16px", "18px", "20px", "24px"];
Quill.register(Size, true);

/**
 * 自定义工具栏
 * @param {*} props 
 */
const CustomToolbar = (props) => {
  // const colors = [
  //   "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff",
  //   "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
  //   "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
  //   "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
  //   "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466",
  // ];
  // const options = colors.map(color => (
  //   <option key={color} value={color}></option>
  // ));
  return (
    <div id={props.id} style={{borderBottom: "none"}}>
      <select className="ql-header" defaultValue={""}>
        <option value="1">标题一</option>
        <option value="2">标题二</option>
        <option value="3">标题三</option>
        <option value="4">标题四</option>
        <option value="">段落</option>
      </select>
      <select className="ql-size" defaultValue={"12px"}>
        <option value="24px">24px</option>
        <option value="20px">20px</option>
        <option value="18px">18px</option>
        <option value="16px">16px</option>
        <option value="14px">14px</option>
        <option value="12px">12px</option>
      </select>
      <select className="ql-color"></select>
      <select className="ql-background"></select>
      <select className="ql-align"></select>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-code-block"></button>
      <button className="ql-insertStar">
        <Icon type="twitter" />
      </button>
      <button className="ql-kyimage">
        <svg viewBox="0 0 18 18">
          <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect>
          <circle className="ql-fill" cx="6" cy="7" r="1"></circle>
          <polyline className="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
        </svg>
      </button>
      <button className="ql-clean"></button>
    </div>
  )
}

export default class RichText extends React.Component {
  static defaultProps = {
    value: "",
    onChange: () => {},
    height: 300,
    readOnly: false,
    imageUploadProps: {},
  }

  formats = [
    "header", "size", "color", "background",
    "align", "list",
    "bold", "italic", "underline", "strike", "blockquote",
    "link", "image", "code-block",
  ];

  constructor(props) {
    super(props);
    let id = uuid();
    this.state = {
      id,
      fileList: [],
      previewVisible: false,
      previewImage: "",
    };
    let self = this;
    this.modules = {
      toolbar: {
        container: `#${id}`,
        handlers: {
          insertStar: function insertStar () {
            const cursorPosition = this.quill.getSelection().index;
            this.quill.insertText(cursorPosition, "★");
            this.quill.setSelection(cursorPosition + 1);
          },
          kyimage: function kyimage () {
            Modal.confirm({
              className: "image-upload-modal",
              width: 400,
              title: "图片上传",
              content: self.renderUpload(),
              cancelText: "取消",
              okText: "确定",
              onOk: (close) => {
                const { fileList } = self.state;
                if (fileList.length === 0) {
                  message.warning("图片未上传~");
                  return;
                }
                this.quill.focus(); // 重要
                fileList.forEach(file => {
                  const cursorPosition = this.quill.getSelection().index;
                  let url = file.url;
                  this.quill.insertEmbed(cursorPosition, "image", url);
                  this.quill.setSelection(cursorPosition + 1);
                });
                self.setState({ fileList: [] });
                close();
              },
              onCancel: (close) => {
                self.setState({ fileList: [] });
                close();
              }
            });
          }
        }
      }
    };
  }

  /**
   * 渲染图片上传组件
   */
  renderUpload = () => {
    const { imageUploadProps } = this.props;
    const { dataTransform, onEnd } = imageUploadProps;
    let props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      accept: ".jpg,.jpeg,.png,.gif",
      listType: "picture-card",
      onPreview: ({ response }) => {
        let { url } = dataTransform ? dataTransform(response) : response;
        this.setState({
          previewImage: url,
          previewVisible: true,
        });
      },
      onChange: ({ file, fileList }) => {
        if (file.status === "error") {
          message.error(`${file.name} 上传失败`);
          return;
        }
        if (file.status === "done") {
          onEnd && onEnd(file);
          let newFileList = fileList.map(file => {
            const { response } = file;
            return dataTransform ? dataTransform(response) : response;
          });
          this.setState({ fileList: newFileList });
        }
      }
    };
    props = Object.assign({}, props, imageUploadProps);
    return (
      <div style={{marginTop: 20}}>
        <Upload {...props}>
          <Icon type="plus" />
          <div className="ant-upload-text">点击上传</div>
        </Upload>
      </div>
    )
  };

  render() {
    let { id, previewVisible, previewImage } = this.state;
    let { height, value, readOnly, style = {} } = this.props;
    if (readOnly) {
      return (
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{__html: value}}
          style={style}
        ></div>
      )
    }
    return (
      <div style={{height: height}}>
        <CustomToolbar id={id} />
        <ReactQuill
          style={{height: height - 42}}
          formats={this.formats}
          modules={this.modules}
          {...this.props}
        />
        <Modal
          wrapClassName="preview-modal"
          visible={previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
