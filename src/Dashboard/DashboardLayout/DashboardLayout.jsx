import React, { useEffect, useState } from 'react';
import { AppstoreAddOutlined, CarOutlined, DesktopOutlined, FileOutlined, FilePptOutlined, OrderedListOutlined, PhoneOutlined, PieChartOutlined, SettingOutlined, ShoppingCartOutlined, TrademarkCircleOutlined } from '@ant-design/icons';
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
import AddSpecification from './AddSpecification/AddSpecifycation';
import Order from './Order/Order';
import ContactUsDashboard from './ContactUsDahboard/ContactUsDashboard';
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
    getItem('إضافة المنتجات', '1', <ShoppingCartOutlined style={{fontSize:"25px"}}/> , "/admin-dashboard/products"),
    getItem('تتبع الطلبات', '2', <OrderedListOutlined style={{fontSize:"25px"}}/>, "/admin-dashboard/orders"),
    getItem('إضافة الأقسام', '3', <AppstoreAddOutlined style={{fontSize:"25px"}}/>, "/admin-dashboard/add-category"),
    getItem('إضافة البراندات', '4', <TrademarkCircleOutlined style={{fontSize:"25px"}}/>, "/admin-dashboard/add-brand"),
    getItem('إضافة الموديلات', '5', <CarOutlined style={{fontSize:"25px"}}/>, "/admin-dashboard/add-model"),
    // getItem('إضافة الألوان', '6', <BgColorsOutlined />, "/admin-dashboard/add-color"),
    getItem('إضافة الخصائص', '7', <SettingOutlined style={{fontSize:"25px"}}/>, "/admin-dashboard/add-specify"),
    getItem('الزائرين', '8', <PhoneOutlined style={{fontSize:"25px"}}/>, "/admin-dashboard/contactUsDashboard"),

  ];
  const selectedKey = items.find(item => location.pathname.includes(item.to))?.key || '1';

  return (
    <Layout className='mainFont' style={{ minHeight: '100vh' ,direction:"rtl",fontFamily:"Cairo"}}>
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
              <Route path="orders" element={<div><Order/></div>} />
              <Route path="add-category" element={<div><AddCategory/></div>} />
              <Route path="add-brand" element={<div><AddBrand/></div>} />
              <Route path="add-model" element={<div><AddModel/></div>} />
              <Route path="add-color" element={<div><AddColor/></div>} />
              <Route path="add-specify" element={<div><AddSpecification/></div>} />
              <Route path="contactUsDashboard" element={<div><ContactUsDashboard/></div>} />



              
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
           ©{new Date().getFullYear()} blaco.com
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

