import React from "react";

const Profile = () => {
  // مستقبلاً يمكننا جلب البيانات من API أو localStorage
  const user = {
    name: "محمد أحمد",
    email: "mohamed@example.com",
    avatar: "https://i.pravatar.cc/150",
    joined: "يناير 2024",
  };

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h4 className="card-title">{user.name}</h4>
          <p className="card-text text-muted">{user.email}</p>
          <p className="card-text">
            <small>عضو منذ: {user.joined}</small>
          </p>
          <button className="btn btn-danger w-100">تسجيل الخروج</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
