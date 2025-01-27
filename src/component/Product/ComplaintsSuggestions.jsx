import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; // للتنسيق الشبكي
import "./ComplaintsSuggestions.css"; // لإضافة تنسيقات مخصصة

const ComplaintsSuggestions = () => {
  const [phone, setPhone] = useState(""); 
  const { Option } = Select;

  const onFinish = (values) => {
    console.log("Form Data:", { ...values, phone });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">الشكاوى والاقتراحات</h2>
      <p className="text-center mb-5 text-secondary">
        نحن نرحب دائمًا بتعاونك معنا ومشاركتك كل مقترحاتك. يمكنك الاتصال على أي من عناوين التواصل المذكورة أدناه أو تعبئة نموذج الشكاوى والاقتراحات وسنسعدنا خدمتك.
      </p>

      <div className="row">
        {/* الجزء الأيسر: نموذج التواصل */}
        <div className="col-12 col-md-8">
          <Form
            name="complaints"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* الاسم */}
            <Form.Item
              label="الاسم"
              name="name"
              rules={[{ required: true, message: "الرجاء إدخال اسمك" }]}
            >
              <Input placeholder="ادخل اسمك" />
            </Form.Item>

            {/* البريد الإلكتروني */}
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

            {/* رقم الجوال */}
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
              <PhoneInput
                country={"sa"}
                enableSearch={true}
                placeholder="أدخل رقم الهاتف"
                inputStyle={{ width: "100%" }}
                value={phone}
                onChange={(value) => setPhone(value)}
              />
            </Form.Item>

            {/* نوع المراسلة */}
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

            {/* عنوان الرسالة */}
            <Form.Item
              label="عنوان الرسالة"
              name="messageTitle"
              rules={[{ required: true, message: "الرجاء إدخال عنوان الرسالة" }]}
            >
              <Input placeholder="عنوان الرسالة" />
            </Form.Item>

            {/* نص الرسالة */}
            <Form.Item
              label="نص الرسالة"
              name="message"
              rules={[{ required: true, message: "الرجاء إدخال نص الرسالة" }]}
            >
              <Input.TextArea rows={4} placeholder="اكتب رسالتك هنا..." />
            </Form.Item>

            {/* زر الإرسال */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                إرسال
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* الجزء الأيمن: معلومات التواصل */}
        <div className="col-12 col-md-4">
          <div className="contact-info">
            <h4>معلومات التواصل:</h4>
            <ul className="list-unstyled">
              <li>
                <strong>الجوال والواتس أب:</strong> 
                <span className="text-primary"> 920031989</span>
              </li>
              <li>
                <strong>البريد الإلكتروني:</strong> 
                <a href="mailto:info@bleco.sa" className="text-primary"> info@bleco.sa</a>
              </li>
              <li>
                <strong>انستجرام وتويتر:</strong> 
                <a href="https://twitter.com/bleco_sa" className="text-primary"> bleco_sa</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsSuggestions;
