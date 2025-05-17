import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import PhoneInput from "react-phone-input-2";
import axios from "axios"; // ✅ استيراد axios
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";

const ContactForm = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { Option } = Select;

  const onFinish = async (values) => {
    setLoading(true);

    const formData = {
      name: values.name,
      email: values.email,
      phone: phone,
      type: values.messageType,
      address: values.messageTitle,
      message: values.message,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/Contact-Us", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        
      });

      console.log("🔹 Response Data:", response.data);

      if (response.status === 200 || response.status === 201) {
        message.success(response.data.message || "تم إرسال الرسالة بنجاح ✅");
      } else {
        message.error("حدث خطأ أثناء إرسال البيانات ❌");
      }
    } catch (error) {
      console.error("❌ Error:", error);

      if (error.response) {
        // ✅ عرض تفاصيل الخطأ من السيرفر
        console.log("🔹 Error Response Data:", error.response.data);
        console.log("🔹 Status Code:", error.response.status);
        console.log("🔹 Headers:", error.response.headers);
        message.error(`خطأ: ${error.response.data.message || "حدث خطأ في الطلب"}`);
      } else if (error.request) {
        console.log("❌ No Response Received:", error.request);
        message.error("❌ لم يتم تلقي استجابة من الخادم");
      } else {
        console.log("❌ Error Message:", error.message);
        message.error("❌ خطأ غير متوقع: " + error.message);
      }
    } finally {
      setLoading(false);
    }
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

        <div className="col-12 col-md-5">
          <Form name="contact" layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item label="الاسم" name="name" rules={[{ required: true, message: "الرجاء إدخال اسمك" }]}>
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
              rules={[{ required: true, message: "الرجاء إدخال رقم هاتفك" }]}
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

            <Form.Item label="نوع المراسلة" name="messageType" rules={[{ required: true, message: "الرجاء اختيار نوع المراسلة" }]}>
              <Select placeholder="اختر نوع المراسلة">
                <Option value="complaint">شكوى</Option>
                <Option value="suggestion">اقتراح</Option>
                <Option value="inquiry">استفسار</Option>
              </Select>
            </Form.Item>

            <Form.Item label="عنوان الرسالة" name="messageTitle" rules={[{ required: true, message: "الرجاء إدخال عنوان الرسالة" }]}>
              <Input placeholder="عنوان الرسالة" />
            </Form.Item>

            <Form.Item label="نص الرسالة" name="message" rules={[{ required: true, message: "الرجاء إدخال نص الرسالة" }]}>
              <Input.TextArea rows={4} placeholder="اكتب رسالتك هنا..." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? "جاري الإرسال..." : "إرسال"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
