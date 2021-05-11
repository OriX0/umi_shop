import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message, Skeleton } from 'antd';
import { addGoods, updateGoods, getGoodsInfo } from '@/services/goods';

const CreateOrEdit = (props) => {
  const { isModalVisible, isShowModal, actionRef, editId } = props;
  // 根据是否有edit 判断操作的类型
  const type = editId === undefined ? '新建' : '编辑';
  console.log('now type', type);

  // 状态---编辑框内初始渲染的数据
  const [initData, setInitData] = useState(null);
  // 在组件渲染后 去获取当前该id的用户详情
  useEffect(async () => {
    if (editId) {
      const response = await getGoodsInfo(editId);
      if (response.status === undefined) {
        setInitData(response);
      }
    }
  }, []);
  const handleSubmit = async function (params) {
    let response;
    if (editId) {
      response = await updateGoods(editId, params);
    } else {
      response = await addGoods(params);
    }
    if (response.status === undefined) {
      message.success(`${type}修改成功`);
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModal(false);
    }
  };
  return (
    <Modal
      title={`${type}商品`}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      {initData === null && editId !== undefined ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <ProForm
          onFinish={(values) => {
            handleSubmit(values);
          }}
          initialValues={initData}
        >
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
          <ProFormText
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
          {/* <ProFormText
          width="md"
          name="price"
          label="价格"
          rules={[
            {
              required: true,
              message: '请输入价格',
            },
            {
              type:'number',
              message:'请输入数字'
            },
          ]}
        />
      <ProFormText
          width="md"
          name="stock"
          label="库存"
          rules={[
            {
              required: true,
              message: '请输入库存',
            },
            {
              type:'number',
              message:'请输入数字'
            },
          ]}
        />
        <ProFormText
          width="md"
          name="cover"
          label="封面图"
          rules={[
            {
              required: true,
              message: '请上传图片',
            },
          ]}
        />
      <ProFormText
          width="md"
          name="pics"
          label="小图集"
          rules={[
            {
              required: true,
              message: '请上传图片',
            },
          ]}
        />
      <ProFormText
          width="md"
          name="details"
          label="详情"
          rules={[
            {
              required: true,
              message: '输入该商品的详情',
            },
          ]}
        /> */}
        </ProForm>
      )}
    </Modal>
  );
};

export default CreateOrEdit;
