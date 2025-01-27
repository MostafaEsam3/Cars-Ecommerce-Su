import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">سياسة الاستبدال والاسترجاع</h1>

      <section className="mb-4">
        <p>
          لأن <strong>كابيتانو</strong> لا تبيع إلا منتجات تحت الطلب، فلذلك لا يوجد لديها سياسة استرجاع واستبدال. 
          ويُستثنى من ذلك إمكانية استبدال المنتج في حال رغبة الزبون بتغيير اللون بلون آخر، 
          أو تغيير شكل التصميم بشرط:
        </p>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            – عدم استخدامه للمنتج الأول، ودفع نصف قيمة المنتج الثاني.
          </li>
          <li className="list-group-item">
            – أن يكون المنتج بنفس حالته عند الشراء ومغلفاً بالغلاف الأصلي.
          </li>
          <li className="list-group-item">
            – أن يكون الاستبدال خلال 14 يوم من تاريخ الشراء.
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-secondary">سياسة الاسترجاع</h2>
        <p>
          عند الوصول إلى مرحلة استرجاع المبلغ، تتم العملية خلال:
        </p>
        <ul className="list-unstyled">
          <li>15 يوم عمل لبطاقات <strong>المدى</strong>.</li>
          <li>17 يوم عمل لبطاقات <strong>الفيزا وماستر كارد</strong>.</li>
        </ul>
        <p className="mt-3">
          <small>
            علماً أن المعاملات المالية تتم مع البنوك، وأيام العمل لديهم من يوم الأحد إلى الخميس. 
            يومي الجمعة والسبت إجازة، فلا يتم احتسابها من أيام العمل.
          </small>
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
