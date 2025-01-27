import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">سياسة الخصوصية</h1>

      <section className="mb-4">
        <h2 className="text-secondary">الموافقة على سياسة الخصوصية</h2>
        <p>
          استخدامك لموقع <strong>كابيتانو</strong> يعني موافقتك على سياسة الخصوصية هذه، والضوابط والشروط التي تحكم الموقع. 
          فإذا لم تكن موافقاً على هذه السياسة، يجب عليك عدم استخدام أي من الخدمات المقدمة من خلال الموقع.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-secondary">جمع البيانات</h2>
        <p>
          بمجرد إدخال بيانات في موقع <strong>كابيتانو</strong>، فإن الموقع يقوم بحفظ بعض بياناتك الشخصية 
          (مثل <span className="text-info">رقم الجوال</span> و<span className="text-info">الموقع</span>)، 
          والتي يمكن استخدامها لتطوير معرفتك بالشركة، ولفهم تفضيلات قاعدة مستخدمي زوار هذا الموقع.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-secondary">حقوق الزائر</h2>
        <p>يحق لزائر الموقع التالي:</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">مراجعة وتعديل المعلومات.</li>
          <li className="list-group-item">الوصول إلى المعلومات.</li>
          <li className="list-group-item">حذف المعلومات.</li>
        </ul>
        <p className="mt-3">
          يمكن تنفيذ هذه الحقوق عبر إرسال رسالة إلكترونية إلى 
          <a href="mailto:info@bleco.sa" className="text-primary"> info@bleco.sa</a>.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-secondary">التواصل معنا</h2>
        <p>إذا كانت لديك أي أسئلة بخصوص سياسة الخصوصية الخاصة بنا، أو طلب مساعدة أو تقديم شكوى، يُرجى الاتصال بنا عبر:</p>
        <ul className="list-unstyled">
          <li>
            <strong>جوال:</strong> 
            <span className="text-info"> 920031989</span>
          </li>
          <li>
            <strong>البريد الإلكتروني:</strong> 
            <a href="mailto:info@bleco.sa" className="text-primary"> info@bleco.sa</a>
          </li>
          <li>
            <strong>أوقات العمل:</strong> 
            من السبت وحتى الخميس (8 صباحاً إلى 5 عصراً).
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
