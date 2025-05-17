import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";

const ContactForm = () => {
  const [phone, setPhone] = useState(""); 
  const { Option } = Select;

  const onFinish = (values) => {
    console.log("Form Data:", { ...values, phone });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">تواصل معنا</h2>
      <div className="row justify-content-between">
       
        <div className="col-12 col-md-6">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.9147992515335!2d46.68976947545134!3d24.710564684122873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f032b5541b5ab%3A0xe44cbe6e4d1f8648!2z2KfZhNmE2YjYr9mK2YrYt9in2LEg2KjYp9mE2LPYqtmK2Kkg2KfZhNmF2YrYqtmK2YHZiNix2YY!5e0!3m2!1sen!2ssa!4v1699457925748!5m2!1sen!2ssa"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* القسم الأيمن: نموذج التواصل */}
        <div className="col-12 col-md-5"style={{ direction: "rtl" }}>
          <Form
            name="contact"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
           
            <Form.Item
              label="الاسم"
              name="name"
              rules={[{ required: true, message: "الرجاء إدخال اسمك" }]}
            >
              <Input placeholder="ادخل اسمك" />
            </Form.Item>

           
            <Form.Item
              label="البريد الإلكتروني"
              name="email"
              rules={[
                { required: true, message: "الرجاء إدخال بريدك الإلكتروني" },
                { type: "email", message: "الرجاء إدخال بريد إلكتروني صالح" },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>

           
            <Form.Item
  label="رقم الجوال"
  name="phone"
  rules={[
    { required: true, message: "الرجاء إدخال رقم هاتفك" },
    {
      validator: (_, value) =>
        phone
          ? Promise.resolve()
          : Promise.reject("الرجاء إدخال رقم هاتف صالح"),
    },
  ]}
>
  {phone !== null && (
    <PhoneInput
      country={"sa"}
      enableSearch={true}
      placeholder="أدخل رقم الهاتف"
      inputStyle={{ width: "100%" }}
      value={phone}
      onChange={(value) => setPhone(value)}
    />
  )}
</Form.Item>


            
            <Form.Item
              label="نوع المراسلة"
              name="messageType"
              rules={[{ required: true, message: "الرجاء اختيار نوع المراسلة" }]}
            >
              <Select placeholder="اختر نوع المراسلة">
                <Option value="complaint">شكوى</Option>
                <Option value="suggestion">اقتراح</Option>
                <Option value="inquiry">استفسار</Option>
              </Select>
            </Form.Item>

           
            <Form.Item
              label="عنوان الرسالة"
              name="messageTitle"
              rules={[{ required: true, message: "الرجاء إدخال عنوان الرسالة" }]}
            >
              <Input placeholder="عنوان الرسالة" />
            </Form.Item>

           
            <Form.Item
              label="نص الرسالة"
              name="message"
              rules={[{ required: true, message: "الرجاء إدخال نص الرسالة" }]}
            >
              <Input.TextArea rows={4} placeholder="اكتب رسالتك هنا..." />
            </Form.Item>

            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                إرسال
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
