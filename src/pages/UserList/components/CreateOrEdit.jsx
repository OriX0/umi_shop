import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message, Skeleton } from 'antd';
import { updateUser, getUserInfo } from '@/services/user';

const CreateOrEdit = (props) => {
  const { isModalVisible, isShowModal, actionRef, editId } = props;
  // 根据是否有edit 判断操作的类型
  const type = editId === undefined ? '新建' : '编辑';

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
  const handleSubmit = async function (params) {
    let response;
    if (editId) {
      response = await updateUser(editId, params);
    } else {
      response = await addUser(params);
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
      title={`${type}用户`}
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
          {editId !== undefined ? (
            ''
          ) : (
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
          )}
        </ProForm>
      )}
    </Modal>
  );
};

export default CreateOrEdit;
