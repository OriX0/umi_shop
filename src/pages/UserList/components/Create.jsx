import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message } from 'antd';
import { addUser } from '@/services/user';

const Create = (props) => {
  const { isModalVisible, isShowCreateModal, actionRef } = props;
  // 调用services 调用接口 去新增用户
  const createNewUser = async function (params) {
    const response = await addUser(params);
    // console.log('add response', response);
    if (response.status === undefined) {
      message.success('用户添加成功');
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowCreateModal(false);
    }
  };
  return (
    <Modal
      title="新增用户"
      visible={isModalVisible}
      onCancel={() => isShowCreateModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      <ProForm
        onFinish={(values) => {
          createNewUser(values);
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="昵称（用户名"
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="xx@xxx.com"
          rules={[
            {
              required: true,
              message: '请输入邮箱',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: 6,
              message: '密码最小6位',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default Create;
