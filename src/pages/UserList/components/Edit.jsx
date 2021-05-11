import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message, Skeleton } from 'antd';
import { updateUser, getUserInfo } from '@/services/user';

const Create = (props) => {
  const { isModalVisible, isShowEditModal, actionRef, editId } = props;
  // 状态---编辑框内初始渲染的数据
  const [initData, setInitData] = useState(null);
  // 在组件渲染后 去获取当前该id的用户详情
  useEffect(async () => {
    if (editId) {
      const response = await getUserInfo(editId);
      if (response.status === undefined) {
        setInitData(response);
      }
    }
  }, []);
  const updateThisUser = async function (params) {
    const response = await updateUser(editId, params);
    if (response.status === undefined) {
      message.success('修改成功');
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowEditModal(false);
    }
  };
  return (
    <Modal
      title="编辑用户"
      visible={isModalVisible}
      onCancel={() => isShowEditModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      {initData === null ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <ProForm
          onFinish={(values) => {
            updateThisUser(values);
          }}
          initialValues={initData}
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
        </ProForm>
      )}
    </Modal>
  );
};

export default Create;
