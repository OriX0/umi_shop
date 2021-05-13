import { Upload, message } from 'antd';
import { getOssToken } from '@/services/aliOss';

class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await getOssToken();
      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };
  //  是以数据流的形式进行上传的 三步走  准备---上传中(分为1到n个流）---上传结束
  onChange = ({ fileList }) => {
    const { onChange } = this.props;
    // console.log('Aliyun OSS:', fileList);
    const { status } = fileList[0];

    if (status === 'done') {
      message.success('文件上传成功');
      // console.log('fileList[0].key:', fileList[0].key);
      const { setUploadFrom, setEditorImageUrl } = this.props;
      if (setUploadFrom) setUploadFrom(fileList[0].key);
      if (setEditorImageUrl) setEditorImageUrl(fileList[0].url);
    }
    if (onChange) {
      onChange([...fileList]);
    }
  };

  onRemove = (file) => {
    const { value, onChange } = this.props;

    const files = value.filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  //  上传的额外参数
  getExtraData = (file) => {
    const { OSSData } = this.state;
    // key 代表该文件对应的唯一键
    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  //  数据解析完毕 上传到oss前的回调函数
  beforeUpload = async (file) => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    const dir = 'oriReact/'; // 自己设置的文件保存路径
    const suffix = file.name.slice(file.name.lastIndexOf('.')); // 拓展名
    const filename = Date.now() + suffix; // 时间+ 后缀
    file.key = OSSData.dir + dir + filename; // 路径+ 文件名
    file.url = OSSData.host + OSSData.dir + dir + filename; // url地址加路径加文件名

    return file;
  };

  render() {
    const { value, accept, showUploadList } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      accept,
      showUploadList,
      listType: 'picture',
      maxCount: 1,
      onChange: this.onChange,
      onRemove: this.onRemove,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
    };
    // 使用this.props.children 来动态接收用于上传的组件 如按钮或者其他 更灵活
    return <Upload {...props}>{this.props.children}</Upload>;
  }
}

export default AliyunOSSUpload;
