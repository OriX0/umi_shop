import React, { useRef, useState } from 'react';
import { Button, Switch, message, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getGoodsList, changeGoodsOn, changeGoodsRecommend } from '@/services/goods';
import CreateOrEdit from './components/CreateOrEdit';

const CommodityManagement = () => {
  const actionRef = useRef();
  // 函数---调用services接口获取所有的商品列表
  const getAllGoods = async (params) => {
    const response = await getGoodsList(params);
    console.log('商品数据：', response);
    return {
      data: response.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response.meta.pagination.total,
    };
  };
  // 函数---调用services接口修改商品的上架及推荐状态
  const handleChangeSwitch = async (id, type) => {
    let response;
    if (type === 'ON') {
      response = await changeGoodsOn(id);
    } else if (type === 'RECOMMEND') {
      response = await changeGoodsRecommend(id);
    }
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
      console.log('父组件', editId);
      setModalVisible(show);
    } else {
      setModalVisible(show);
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品主图',
      dataIndex: 'cover',
      hideInSearch: true,
      render: (_, record) => [<Image key={record.id} width={64} src={record.cover_url} />],
    },
    { title: '标题', dataIndex: 'title' },
    { title: '价格', dataIndex: 'price', hideInSearch: true },
    { title: '库存', dataIndex: 'stock', hideInSearch: true },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      valueType: 'radio',
      valueEnum: {
        1: { text: '上架' },
        0: { text: '下架' },
      },
      render: (_, record) => [
        <Switch
          key={record.id}
          checkedChildren="上架"
          unCheckedChildren="下架"
          defaultChecked={record.is_on === 1}
          onChange={() => {
            handleChangeSwitch(record.id, 'ON');
          }}
        />,
      ],
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已推荐' },
        0: { text: '不推荐' },
      },
      render: (_, record) => [
        <Switch
          key={record.id}
          checkedChildren="已推荐"
          unCheckedChildren="未推荐"
          defaultChecked={record.is_recommend === 1}
          onChange={() => {
            handleChangeSwitch(record.id, 'RECOMMEND');
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
        request={(params = {}) => getAllGoods(params)}
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
        headerTitle="商品列表"
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

export default CommodityManagement;
