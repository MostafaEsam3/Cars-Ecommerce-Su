import React, { useEffect, useState } from 'react';
import { DesktopOutlined, FileOutlined, FilePptOutlined, PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'; // Import Link for navigation
import About from '../../component/About/About';
import AddProduct from './AddProduct/AddProduct';
import ShowProducts from './ShowProducts/ShowProducts';
import AddCategory from './AddCategory/AddCategory';
import AddBrand from './AddBrand/AddBrand';
import "./DashBoard.css"
import AddModel from './AddModel/AddModel';
import AddColor from './AddColor/AddColor';
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
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    navigate('/admin-dashboard/products');
  }, []);
  const items = [
    getItem('اضافه المنتجات', '1', <PieChartOutlined />, "/admin-dashboard/products"),
    getItem('تتبع الاوردرات', '2', <FileOutlined />, "/admin-dashboard/orders"),
    getItem('اضافه الاقسام ', '3', <FileOutlined />, "/admin-dashboard/add-category"),
    getItem('اضافه البراندات ', '4', <FilePptOutlined />, "/admin-dashboard/add-brand"),
    getItem('اضافه الموديلات ', '5', <FilePptOutlined />, "/admin-dashboard/add-model"),
    getItem('اضافه الالوان ', '6', <DesktopOutlined />, "/admin-dashboard/add-color"),

  ];
  const selectedKey = items.find(item => location.pathname.includes(item.to))?.key || '1';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        {/* Displaying links inside Menu */}
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
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
            {/* هنا الايليمت */}
            <Routes>
            <Route path="products" element={<div><AddProduct/></div>} />
              <Route path="orders" element={<div>تتبع الاوردرات</div>} />
              <Route path="add-category" element={<div><AddCategory/></div>} />
              <Route path="add-brand" element={<div><AddBrand/></div>} />
              <Route path="add-model" element={<div><AddModel/></div>} />
              <Route path="add-color" element={<div><AddColor/></div>} />


              
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

