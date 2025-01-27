import React from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LuxuryCover.css";
import LuxuryColors from "./LuxuryColors";
import LuxuryLayers from "./LuxuryLayers";

const LuxuryCover = () => {
  // بيانات المواصفات الفنية
  const specifications = [
    {
      key: "1",
      label: "النوع",
      value: "الليزر",
    },
    {
      key: "2",
      label: "نوع الجلد",
      value: "صناعي صديق للبيئة",
    },
    {
      key: "3",
      label: "السُمك",
      value: "10 ملم",
    },
  ];

  // أعمدة الجدول
  const columns = [
    {
      title: "الخاصية",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "الوصف",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div className="container py-5">
      {/* العنوان والوصف */}
      <h1 className="text-center mb-3 text-primary">
        تعرف على مواصفات تلبيسة الفاخر
      </h1>
      <p className="text-center text-secondary">
        نسعد بثقتكم ولا نرضى بغير رضاكم.
      </p>

      <div className="row align-items-center">
        {/* الصورة */}
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="image-container">
            <img
              src="https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_01-8.webp" // رابط الصورة (يمكنك تغييره)
              alt="تلبيسة الفاخر"
              className="img-fluid rounded-circle shadow"
            />
          </div>
        </div>

        {/* الجدول */}
        <div className="col-12 col-md-6">
          <h4 className="text-primary mb-3">مواصفات تلبيسة الفاخر</h4>
          <p className="text-muted mb-3">
            يوضح هذا الجدول المواصفات الفنية لطبقات تلبيسة الفاخر.
          </p>
          <Table
            dataSource={specifications}
            columns={columns}
            pagination={false}
            bordered
          />
        </div>
      </div>
      <section className="colors">
        <LuxuryColors />
      </section>
      <section className="layers-section">
        <LuxuryLayers />
      </section>
    </div>
  );
};

export default LuxuryCover;
