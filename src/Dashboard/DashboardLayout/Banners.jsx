import React, { useState } from "react";

function Banners() {
  const [banners, setBanners] = useState([{ title: "", image: null }]);

  const handleTitleChange = (index, value) => {
    const updated = [...banners];
    updated[index].title = value;
    setBanners(updated);
  };

  const handleImageChange = (index, file) => {
    const updated = [...banners];
    updated[index].image = file;
    setBanners(updated);
  };

  const handleAddBanner = () => {
    setBanners([...banners, { title: "", image: null }]);
  };

  const handleRemoveBanner = (index) => {
    const updated = [...banners];
    updated.splice(index, 1);
    setBanners(updated);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">إدارة البنرات</h3>

      {banners.map((banner, index) => (
        <div
          key={index}
          className="d-flex align-items-center mb-3 border p-2 rounded"
        >
          <span className="me-2">{index + 1}.</span>

          <input
            type="text"
            placeholder={`عنوان البنر ${index + 1}`}
            value={banner.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            className="form-control me-2"
            style={{ maxWidth: "300px" }}
          />

          <input
            type="file"
            onChange={(e) => handleImageChange(index, e.target.files[0])}
            className="form-control me-2"
            style={{ maxWidth: "200px" }}
          />

          <button
            className="btn btn-danger"
            onClick={() => handleRemoveBanner(index)}
          >
            حذف
          </button>
        </div>
      ))}

      <button className="btn btn-success" onClick={handleAddBanner}>
        + إضافة بنر جديد
      </button>

      {/* <pre className="mt-4 bg-light p-2">
        {JSON.stringify(banners, null, 2)}
      </pre> */}
    </div>
  );
}

export default Banners;
