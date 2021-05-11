import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { fetchIndexStatistData } from '@/services/dashboard';

const Dashboard = () => {
  const [data, setData] = useState({});
  useEffect(async () => {
    const response = await fetchIndexStatistData();
    console.log(response);
    setData(response);
  }, []);
  return (
    <PageContainer>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="用户统计"
                value={data.users_count}
                valueStyle={{ color: '#e60039' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="商品统计"
                value={data.goods_count}
                valueStyle={{ color: '#7ecdb6' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="订单统计"
                value={data.order_count}
                valueStyle={{ color: '#7d7d00' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      ,
    </PageContainer>
  );
};

export default Dashboard;
