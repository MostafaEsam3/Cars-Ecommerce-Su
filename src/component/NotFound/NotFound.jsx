import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>عذراً، الصفحة غير موجودة ❗</h2>
        <p>يبدو أنك ضللت الطريق. لا تقلق! سنعيدك للصفحة الرئيسية.</p>
        <Link to="/" className="btn btn-primary">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
