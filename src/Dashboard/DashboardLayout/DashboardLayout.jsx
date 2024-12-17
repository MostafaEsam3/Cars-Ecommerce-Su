import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom'; // Import Link for navigation

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, to) {
  return {
    key,
    icon,
    label,
    to, // Using `to` for the link address
  };
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem('اضافه المنتجات', '1', <PieChartOutlined />, "/admin-dashboard/products"),
    getItem('اضافه الاقسام', '2', <DesktopOutlined />, "/admin-dashboard/categories"),
    getItem('تتبع الاوردرات', '9', <FileOutlined />, "/admin-dashboard/orders"),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        {/* Displaying links inside Menu */}
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>الادمن</Breadcrumb.Item>
            <Breadcrumb.Item>بلاكو</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="products" element={<div>اضافه المنتجات و كل ما يتعلق بها</div>} />
              <Route path="categories" element={<div
              >ا
              ضافه الاقسام الخاصه بالمنتجات
              <Link to={"/admin-dashboard/products"}>jjjjjjjj</Link>
              </div>} />
              <Route path="orders" element={<div>تتبع الاوردرات</div>} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
