import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText, ProFormDigit, ProFormTextArea } from '@ant-design/pro-form';
import { Modal, message, Skeleton, Cascader, Button, Image } from 'antd';
import { addGoods, updateGoods, getGoodsInfo } from '@/services/goods';
import { getCategoryList } from '@/services/category';
import { UploadOutlined } from '@ant-design/icons';
import AliOssUpload from '@/components/AliOssUpload';
import RichTextEditor from '@/components/RichTextEditor';

const CreateOrEdit = (props) => {
  const { isModalVisible, isShowModal, actionRef, editId } = props;
  // 根据是否有edit 判断操作的类型
  const type = editId === undefined ? '新建' : '编辑';
  // 状态---编辑框内初始渲染的数据
  const [initData, setInitData] = useState(null);
  // 状态---商品分类
  const [resCategory, setCategory] = useState(null);
  // 新建和编辑modal的提交按钮点击后的响应
  const handleSubmit = async function (params) {
    let response;
    const subParams = { ...params, category_id: params.category_id[1] };
    console.log('subParams: ', subParams);
    if (editId) {
      response = await updateGoods(editId, subParams);
    } else {
      response = await addGoods(subParams);
    }
    if (response.status === undefined) {
      message.success(`${type}成功`);
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModal(false);
    }
  };
  // 使用useFrom生成上传from的实例
  const [modalForm] = ProForm.useForm();
  // 设置上传from后改变from表单cover值的方法
  const setFormCover = (fileKey) => {
    modalForm.setFieldsValue({ cover: fileKey });
  };
  // 富文本编辑器改变后对表单detail值设置的方法
  const setFormDetails = (content) => {
    modalForm.setFieldsValue({ details: content });
  };
  // 在组件渲染后 去获取当前该id的用户详情
  useEffect(async () => {
    console.log('now type', type);
    // 获得分类
    const allCategoryRes = await getCategoryList();
    if (allCategoryRes.status === undefined) {
      setCategory(allCategoryRes);
    }
    if (editId) {
      const response = await getGoodsInfo(editId);
      if (response.status === undefined) {
        console.log('goods info:', response);
        //  对于商品分类进行相关处理 避免渲染不正确
        const { pid, id } = response.category;
        let category_id;
        if (pid === 0) category_id = [id];
        else category_id = [pid, id];
        const data = { ...response, category_id };
        setInitData(data);
      }
    }
  }, []);
  return (
    <Modal
      title={`${type}商品`}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
      destroyOnClose={true}
      forceRender={true}
    >
      {initData === null && editId !== undefined ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <ProForm
          onFinish={(values) => {
            handleSubmit(values);
          }}
          initialValues={initData}
          form={modalForm}
        >
          <ProForm.Item
            label="分类"
            name="category_id"
            rules={[
              {
                required: true,
                message: '请选择分类',
              },
            ]}
          >
            <Cascader
              options={resCategory}
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              placeholder="Please select"
            />
          </ProForm.Item>
          <ProFormText
            width="md"
            name="title"
            label="标题"
            placeholder="请输入商品标题"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
          />
          <ProFormTextArea
            width="md"
            name="description"
            label="描述"
            placeholder="商品的描述...巴拉巴拉"
            rules={[
              {
                required: true,
                message: '请输入商品的描述',
              },
            ]}
          />
          <ProFormDigit
            width="md"
            name="price"
            label="价格"
            min={0}
            max={100000}
            rules={[
              {
                required: true,
                message: '请输入价格',
              },
              {
                type: 'number',
                message: '请输入数字',
              },
            ]}
          />
          <ProFormDigit
            width="md"
            name="stock"
            label="库存"
            min={0}
            max={100000}
            rules={[
              {
                required: true,
                message: '请输入库存',
              },
              {
                type: 'number',
                message: '请输入数字',
              },
            ]}
          />
          <ProFormText width="md" name="cover" label="占位" hidden={true} />

          <ProForm.Item
            label="封面图上传"
            name="cover"
            rules={[
              {
                required: true,
                message: '请上传该产品封面图',
              },
            ]}
          >
            <div>
              {initData === null || !initData.cover_url ? (
                ''
              ) : (
                <Image width={64} src={initData.cover_url} />
              )}
              <AliOssUpload setUploadFrom={setFormCover} accept="image/*" showUploadList={true}>
                <Button icon={<UploadOutlined />}>点我上传</Button>
              </AliOssUpload>
            </div>
          </ProForm.Item>
          <ProForm.Item
            label="商品详情"
            name="details"
            rules={[
              {
                required: true,
                message: '请输入商品详情',
              },
            ]}
          >
            <RichTextEditor setFormDetails={setFormDetails} initEditdata={initData.details} />
          </ProForm.Item>
        </ProForm>
      )}
    </Modal>
  );
};

export default CreateOrEdit;
