// DeliveryPage.jsx
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const mockOrders = [
  {
    id: 1,
    customer: "أحمد محمد",
    address: "الرياض - السعودية",
    status: "قيد التحضير",
    lastUpdate: "2025-05-24",
  },
  {
    id: 2,
    customer: "سارة علي",
    address: "جدة - السعودية",
    status: "قيد الشحن",
    lastUpdate: "2025-05-23",
  },
  {
    id: 3,
    customer: "خالد عبد الله",
    address: "الدمام - السعودية",
    status: "تم التوصيل",
    lastUpdate: "2025-05-22",
  },
];

const DeliveryPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedOrders = orders.map((o) =>
      o.id === selectedOrder.id ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    setShowModal(false);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.includes(search) || order.id.toString().includes(search)
  );

  return (
    <div className="container">
      <h2 className="mb-4">إدارة التوصيل</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ابحث برقم الطلب أو اسم العميل"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>رقم الطلب</th>
            <th>اسم العميل</th>
            <th>العنوان</th>
            <th>الحالة</th>
            <th>آخر تحديث</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.address}</td>
              <td>
                <span
                  className={`badge ${
                    order.status === "تم التوصيل"
                      ? "bg-success"
                      : order.status === "قيد الشحن"
                      ? "bg-warning"
                      : "bg-secondary"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>{order.lastUpdate}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenModal(order)}
                >
                  تعديل الحالة
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل حالة الطلب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>الحالة الجديدة</Form.Label>
            <Form.Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option>قيد التحضير</option>
              <option>قيد الشحن</option>
              <option>تم التوصيل</option>
              <option>فشل التوصيل</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إلغاء
          </Button>
          <Button variant="success" onClick={handleSave}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeliveryPage;
