import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, FilePptOutlined, PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes, useLocation } from 'react-router-dom'; // Import Link for navigation
import About from '../../component/About/About';
import AddProduct from './AddProduct/AddProduct';
import ShowProducts from './ShowProducts/ShowProducts';
import AddCategory from './AddCategory/AddCategory';
import AddBrand from './AddBrand/AddBrand';
import "./DashBoard.css"
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
  const location = useLocation();  // للحصول على المسار الحالي
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem('اضافه المنتجات', '1', <PieChartOutlined />, "/admin-dashboard/products"),
    getItem('اضافه الاقسام', '2', <DesktopOutlined />, "/admin-dashboard/categories"),
    getItem('تتبع الاوردرات', '3', <FileOutlined />, "/admin-dashboard/orders"),
    getItem('عرض المنتجات', '4', <FileOutlined />, "/admin-dashboard/show-products"),
    getItem('اضافه الاقسام ', '5', <FileOutlined />, "/admin-dashboard/add-category"),
    getItem('اضافه البراندات ', '6', <FilePptOutlined />, "/admin-dashboard/add-brand"),

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
              <Route path="products" element={<div>
                <AddProduct/>
              </div>
            } />
              <Route path="categories" element={<div>
              ضافه الاقسام الخاصه بالمنتجات
              <Link to={"/admin-dashboard/products"}>jjjjjjjj</Link>
              </div>} />
              <Route path="orders" element={<div>تتبع الاوردرات</div>} />

              <Route path="show-products" element={<div><ShowProducts/></div>} />
              <Route path="add-category" element={<div><AddCategory/></div>} />
              <Route path="add-brand" element={<div><AddBrand/></div>} />
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
