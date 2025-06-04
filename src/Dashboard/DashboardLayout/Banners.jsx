import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function Banners() {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [editBanner, setEditBanner] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("authToken");

  const fetchBanners = async (page = 1) => {
    if (!token) {
      setErrorMsg("❗ لا يوجد توكن في localStorage");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(
        `https://api.admin.kapitiano.com/dashboard/banners-paginate?page=${page}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      if (result.message !== "success") throw new Error("فشل في جلب البنرات");
      setBanners(result.data.data);
      setPagination(result.data.pagination);
    } catch (error) {
      setErrorMsg(error.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleNewChange = (field, value) => {
    setNewBanner({ ...newBanner, [field]: value });
  };

  const handleAddBannerApi = async () => {
    if (!newBanner.title || !newBanner.description || !newBanner.image) {
      alert("الرجاء إدخال عنوان ووصف البنر وتحميل صورة");
      return;
    }
    const formData = new FormData();
    formData.append("title", newBanner.title);
    formData.append("description", newBanner.description);
    formData.append("image", newBanner.image);

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch(
        `https://api.admin.kapitiano.com/dashboard/banners`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "فشل في إضافة البنر");
      setNewBanner({ title: "", description: "", image: null });
      setSuccessMsg("✅ تم إضافة البنر بنجاح");
      fetchBanners(pagination.current_page);
    } catch (error) {
      setErrorMsg(error.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBannerApi = async (id) => {
    if (!window.confirm("❗ هل أنت متأكد من حذف هذا البنر؟")) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch(
        `https://api.admin.kapitiano.com/dashboard/banners/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "فشل في حذف البنر");
      setSuccessMsg("✅ تم حذف البنر بنجاح");
      fetchBanners(pagination.current_page);
    } catch (error) {
      setErrorMsg(error.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleEditBannerApi = async () => {
    if (!editBanner.title || !editBanner.description) {
      alert("الرجاء إدخال عنوان ووصف البنر");
      return;
    }
    const formData = new FormData();
    formData.append("_method", "PUT"); // ✅ أضف هذا السطر المهم
    formData.append("title", editBanner.title);
    formData.append("description", editBanner.description);
    if (editBanner.image instanceof File) {
      formData.append("image", editBanner.image);
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch(
        `https://api.admin.kapitiano.com/dashboard/banners/${editBanner.id}`,
        {
          method: "POST", // ✅ POST مع _method=PUT
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "فشل في تعديل البنر");
      setSuccessMsg("✅ تم تعديل البنر بنجاح");
      setEditBanner(null);
      fetchBanners(pagination.current_page);
    } catch (error) {
      setErrorMsg(error.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">إدارة البنرات</h2>

      <div className="border p-4 mb-5 rounded shadow-sm bg-white">
        <h4 className="mb-3">إضافة بنر جديد</h4>
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
        <button
          className="btn btn-success w-100"
          onClick={handleAddBannerApi}
          disabled={loading}
        >
          {loading ? "🚀 جاري الإضافة..." : "✅ إضافة بنر"}
        </button>
        {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
        {successMsg && (
          <div className="alert alert-success mt-3">{successMsg}</div>
        )}
      </div>

      <h4 className="mb-3">قائمة البنرات</h4>
      {loading ? (
        <p className="text-center">⏳ جاري التحميل...</p>
      ) : banners.length === 0 ? (
        <p className="text-muted">لا توجد بنرات حالياً.</p>
      ) : (
        banners.map((banner) => (
          <div
            key={banner.id}
            className="border p-3 mb-4 rounded shadow-sm bg-light position-relative"
          >
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h5>{banner.title}</h5>
                <p>{banner.description}</p>
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt={banner.title}
                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                  />
                ) : (
                  <p className="text-muted">لا توجد صورة</p>
                )}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditBanner(banner)}
                >
                  تعديل
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteBannerApi(banner.id)}
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination controls */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-primary"
          disabled={pagination.current_page === 1}
          onClick={() => fetchBanners(pagination.current_page - 1)}
        >
          ⬅️ السابق
        </button>
        <span>
          صفحة {pagination.current_page} من {pagination.last_page}
        </span>
        <button
          className="btn btn-outline-primary"
          disabled={pagination.current_page === pagination.last_page}
          onClick={() => fetchBanners(pagination.current_page + 1)}
        >
          التالي ➡️
        </button>
      </div>

      {/* Edit Modal */}
      <Modal show={!!editBanner} onHide={() => setEditBanner(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>تعديل البنر</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editBanner && (
            <>
              <input
                type="text"
                value={editBanner.title}
                onChange={(e) =>
                  setEditBanner({ ...editBanner, title: e.target.value })
                }
                className="form-control mb-2"
                placeholder="عنوان البنر"
              />
              <textarea
                value={editBanner.description}
                onChange={(e) =>
                  setEditBanner({ ...editBanner, description: e.target.value })
                }
                className="form-control mb-2"
                rows={3}
                placeholder="وصف البنر"
              />
              <input
                type="file"
                onChange={(e) =>
                  setEditBanner({ ...editBanner, image: e.target.files[0] })
                }
                className="form-control"
              />
              {editBanner.image && !(editBanner.image instanceof File) && (
                <img
                  src={editBanner.image}
                  alt="صورة حالية"
                  className="img-fluid rounded mt-2"
                />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditBanner(null)}>
            إلغاء
          </Button>
          <Button
            variant="primary"
            onClick={handleEditBannerApi}
            disabled={loading}
          >
            {loading ? "🚀 جاري الحفظ..." : "💾 حفظ التعديلات"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Banners;
