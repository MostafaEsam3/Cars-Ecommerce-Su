import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JoinUs.css";

const { Option } = Select;

const JoinUs = () => {
  const [phone, setPhone] = useState(""); 

  const onFinish = (values) => {
    console.log("Form Data:", { ...values, phone });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">انضم إلينا</h2>
      <div className="form-container mx-auto shadow p-4 rounded">
        <Form
          name="joinUs"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* رقم الواتساب */}
          <Form.Item
            label="رقم الواتساب"
            name="whatsapp"
            rules={[{ required: true, message: "الرجاء إدخال رقم الواتساب الخاص بك" }]}
          >
            <PhoneInput
              country={"sa"}
              enableSearch={true}
              placeholder="ادخل رقم الواتساب الخاص بك"
              inputStyle={{ width: "100%" }}
              value={phone}
              onChange={(value) => setPhone(value)}
            />
          </Form.Item>

          <Button type="primary" block className="mb-4">
            تفعيل رقم الجوال
          </Button>

          <p className="text-muted mb-4">
            سيتم إرسال كود التفعيل إلى رقم الواتساب المدخل.
          </p>

          {/* البريد الإلكتروني */}
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "الرجاء إدخال بريدك الإلكتروني" },
              { type: "email", message: "الرجاء إدخال بريد إلكتروني صالح" },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          {/* كلمة المرور */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "الرجاء إدخال كلمة المرور" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          {/* تحديد التسجيل */}
          <Form.Item
            label="أرغب في التسجيل في"
            name="registerFor"
            rules={[{ required: true, message: "الرجاء اختيار الخيار المناسب" }]}
          >
            <Select placeholder="---Select---">
              <Option value="user">عميل</Option>
              <Option value="partner">شريك</Option>
              <Option value="supplier">مورد</Option>
            </Select>
          </Form.Item>

          {/* زر التسجيل */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              تسجيل
            </Button>
          </Form.Item>
        </Form>

        <p className="text-muted text-center mt-3">
          سيتم استخدام بياناتك الشخصية لدعم تجربتك عبر هذا الموقع، وإدارة الوصول إلى حسابك، ولأغراض أخرى موضحة في{" "}
          <a href="/policies/privacy" className="text-primary">
            سياسة الخصوصية
          </a>.
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
