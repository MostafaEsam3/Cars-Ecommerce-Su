import React, { useState } from "react";

function Banners() {
  const [banners, setBanners] = useState([
    { id: 1, title: "بنر 1", description: "وصف البنر الأول", image: null },
    { id: 2, title: "بنر 2", description: "وصف البنر الثاني", image: null },
  ]);

  const [newBanner, setNewBanner] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleNewChange = (field, value) => {
    setNewBanner({ ...newBanner, [field]: value });
  };

  const handleAddBanner = () => {
    if (!newBanner.title || !newBanner.description) {
      alert("الرجاء إدخال عنوان ووصف البنر");
      return;
    }
    const newId = banners.length > 0 ? banners[banners.length - 1].id + 1 : 1;
    setBanners([...banners, { ...newBanner, id: newId }]);
    setNewBanner({ title: "", description: "", image: null });
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  const handleEditBanner = (id, field, value) => {
    const updated = banners.map((banner) =>
      banner.id === id ? { ...banner, [field]: value } : banner
    );
    setBanners(updated);
  };

  const handleImageChange = (id, file) => {
    const updated = banners.map((banner) =>
      banner.id === id ? { ...banner, image: file } : banner
    );
    setBanners(updated);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center"> إدارة البنرات </h2>

      <div className="border p-4 mb-5 rounded shadow-sm bg-white">
        <h4 className="mb-3"> إضافة بنر جديد</h4>
        <input
          type="text"
          placeholder="عنوان البنر"
          value={newBanner.title}
          onChange={(e) => handleNewChange("title", e.target.value)}
          className="form-control mb-2"
        />
        <textarea
          placeholder="وصف البنر"
          value={newBanner.description}
          onChange={(e) => handleNewChange("description", e.target.value)}
          className="form-control mb-2"
          rows={3}
        />
        <input
          type="file"
          onChange={(e) => handleNewChange("image", e.target.files[0])}
          className="form-control mb-3"
        />
        <button className="btn btn-success w-100" onClick={handleAddBanner}>
          ✅ إضافة بنر
        </button>
      </div>

      <h4 className="mb-3"> قائمة البنرات</h4>

      {banners.length === 0 ? (
        <p className="text-muted">لا توجد بنرات حالياً.</p>
      ) : (
        banners.map((banner) => (
          <div
            key={banner.id}
            className="border p-3 mb-4 rounded shadow-sm bg-light position-relative"
          >
            <div className="d-flex justify-content-between align-items-start">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteBanner(banner.id)}
              >
                حذف
              </button>

              <div className="flex-grow-1 ms-3">
                <input
                  type="text"
                  value={banner.title}
                  onChange={(e) =>
                    handleEditBanner(banner.id, "title", e.target.value)
                  }
                  className="form-control mb-2"
                />
                <textarea
                  value={banner.description}
                  onChange={(e) =>
                    handleEditBanner(banner.id, "description", e.target.value)
                  }
                  className="form-control mb-2"
                  rows={3}
                />

                {banner.image ? (
                  <div className="mb-2">
                    <strong>صورة البنر:</strong>{" "}
                    <span>{banner.image.name}</span>
                  </div>
                ) : (
                  <div className="mb-2 text-muted">لم يتم رفع صورة</div>
                )}

                <input
                  type="file"
                  onChange={(e) =>
                    handleImageChange(banner.id, e.target.files[0])
                  }
                  className="form-control"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Banners;
