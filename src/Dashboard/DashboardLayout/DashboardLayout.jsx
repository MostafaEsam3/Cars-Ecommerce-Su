// Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  AppstoreAddOutlined,
  CarOutlined,
  FileOutlined,
  OrderedListOutlined,
  PhoneOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TrademarkCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Modal, theme } from "antd";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AddProduct from "./AddProduct/AddProduct";
import AddCategory from "./AddCategory/AddCategory";
import AddBrand from "./AddBrand/AddBrand";
import AddModel from "./AddModel/AddModel";
import AddColor from "./AddColor/AddColor";
import AddSpecification from "./AddSpecification/AddSpecifycation";
import Order from "./Order/Order";
import ContactUsDashboard from "./ContactUsDahboard/ContactUsDashboard";
import DeliveryPage from "./DeliveryPage/DeliveryPage"; // ✅ NEW
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap import
import "./DashBoard.css";
import axiosInstance from "../../util/interceptor";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, to) {
  return { key, icon, label, to };
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    navigate("/admin-dashboard/products");
  }, []);

  const handleLogout = () => {
    Modal.confirm({
      title: "تأكيد تسجيل الخروج",
      content: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
      okText: "نعم",
      cancelText: "إلغاء",
      onOk: async () => {
        try {
          await axiosInstance.post("dashboard/logout");
          localStorage.removeItem("isAuthenticated");
          navigate("/admin-login");
        } catch (error) {
          console.error("Logout Error:", error);
        }
      },
    });
  };

  const items = [
    getItem(
      "إضافة المنتجات",
      "1",
      <ShoppingCartOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/products"
    ),
    getItem(
      "تتبع الطلبات",
      "2",
      <OrderedListOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/orders"
    ),
    getItem(
      "إضافة الأقسام",
      "3",
      <AppstoreAddOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/add-category"
    ),
    getItem(
      "إضافة البراندات",
      "4",
      <TrademarkCircleOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/add-brand"
    ),
    getItem(
      "إضافة الموديلات",
      "5",
      <CarOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/add-model"
    ),
    getItem(
      "إضافة الخصائص",
      "7",
      <SettingOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/add-specify"
    ),
    getItem(
      "إدارة التوصيل", // ✅ NEW
      "10",
      <RocketOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/delivery"
    ),
    getItem(
      "الزائرين",
      "8",
      <PhoneOutlined style={{ fontSize: "25px" }} />,
      "/admin-dashboard/contactUsDashboard"
    ),
    getItem(
      "تسجيل الخروج",
      "9",
      <FileOutlined style={{ fontSize: "25px" }} />,
      "logout"
    ),
  ];

  const selectedKey =
    items.find((item) => location.pathname.includes(item.to))?.key || "1";

  return (
    <Layout
      className="mainFont"
      style={{ minHeight: "100vh", direction: "rtl", fontFamily: "Cairo" }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
          {items.map((item) =>
            item.to === "logout" ? (
              <Menu.Item key={item.key} icon={item.icon} onClick={handleLogout}>
                {item.label}
              </Menu.Item>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.to}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
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
              <Route path="products" element={<AddProduct />} />
              <Route path="orders" element={<Order />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="add-brand" element={<AddBrand />} />
              <Route path="add-model" element={<AddModel />} />
              <Route path="add-color" element={<AddColor />} />
              <Route path="add-specify" element={<AddSpecification />} />
              <Route
                path="contactUsDashboard"
                element={<ContactUsDashboard />}
              />
              <Route path="delivery" element={<DeliveryPage />} />{" "}
              {/* ✅ NEW */}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} blaco.com
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
