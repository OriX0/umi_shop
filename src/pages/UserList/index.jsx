import React, { useRef, useState } from 'react';
import { Button, Switch, Avatar, message } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getUserList, changeUserLock } from '@/services/user';
import CreateOrEdit from './components/CreateOrEdit';

const UserList = () => {
  const actionRef = useRef();
  // 函数---调用services接口获取全部用户
  const getAllUser = async (params) => {
    const response = await getUserList(params);
    return {
      data: response.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response.meta.pagination.total,
    };
  };
  // 函数---调用services接口对用户的禁用或解锁进行操作
  const handleChangeLock = async (id) => {
    const response = await changeUserLock(id);
    if (response.status === undefined) {
      message.success('操作成功');
    } else {
      message.error('操作失败');
    }
  };
  // 状态---模态框的显示
  const [isShowModal, setModalVisible] = useState(false);
  // 状态---修改当前的id
  const [editId, setEditId] = useState(undefined);
  const changeModalShow = (show, id = undefined) => {
    if (id) {
      setEditId(id);
      // console.log('父组件', editId);
      setModalVisible(show);
    } else {
      setModalVisible(show);
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => [
        <Avatar key={record.id} size={32} icon={<UserOutlined />} src={record.avatar_url} />,
      ],
    },
    { title: '名字', dataIndex: 'name' },
    { title: '邮箱', dataIndex: 'email', hideInSearch: true },
    {
      title: '是否锁定',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => [
        <Switch
          key={record.id}
          checkedChildren="锁定"
          unCheckedChildren="正常"
          defaultChecked={record.is_locked === 1}
          onChange={() => {
            handleChangeLock(record.id);
          }}
        />,
      ],
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'name',
      hideInSearch: true,
      render: (_, record) => [
        <a
          key={record.id}
          onClick={() => {
            changeModalShow(true, record.id);
          }}
        >
          {' '}
          编辑
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={(params = {}) => getAllUser(params)}
        editable={{
          type: 'multiple',
        }}
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => changeModalShow(true)}
          >
            新建
          </Button>,
        ]}
      />
      {!isShowModal ? (
        ''
      ) : (
        <CreateOrEdit
          isModalVisible={isShowModal}
          isShowModal={changeModalShow}
          actionRef={actionRef}
          editId={editId}
        />
      )}
    </PageContainer>
  );
};

export default UserList;
