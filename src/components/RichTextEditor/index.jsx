import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import AliOssUpload from '@/components/AliOssUpload';
import { ContentUtils } from 'braft-utils';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
// 引入border边框
import './index.less';

export default class EditorDemo extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null),
  };

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
    //  1.判断值是否为空
    //  2.如果不为空 则转换为html格式
    if (!editorState.isEmpty()) {
      let content = editorState.toHTML();
      //  3.调用父组件传入的函数 将值赋值到对应的表单key中
      this.props.setFormDetails(content);
    }
  };
  setEditorImageUrl = (url) => {
    // console.log('this pic url:', url);
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [
        {
          type: 'IMAGE',
          url,
        },
      ]),
    });
  };
  render() {
    const { editorState } = this.state;
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <AliOssUpload
            accept="image/*"
            setEditorImageUrl={this.setEditorImageUrl}
            showUploadList={false}
          >
            <button className="control-item button upload-button" data-title="插入图片">
              插入图片
            </button>
          </AliOssUpload>
        ),
      },
    ];
    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          // onSave={this.submitContent}
          extendControls={extendControls}
        />
      </div>
    );
  }
}
