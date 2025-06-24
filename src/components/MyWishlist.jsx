import { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import AddWishModal from "./AddWishModal";

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const handleAddWish = (newWish) => {
    const updated = [...wishlist, newWish];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <section className="container py-5">
      <h2 className="mb-4 text-center text-white">My Wishlist</h2>

      <div className="row g-4">
        {wishlist.map((item) => (
          <div key={item.id} className="col-md-4">
            <RecommendationCard
              gift={item}
              isPersonal
              onRemove={() => handleRemove(item.id)}
            />
          </div>
        ))}

        {/* Card: Add New Wish */}
        <div className="col-md-4">
          <div
            className="h-100 d-flex flex-column justify-content-center align-items-center text-center"
            style={{ cursor: "pointer", minHeight: "250px" }}
            onClick={() => setShowModal(true)}
          >
            <div style={{ fontSize: "2.5rem" }}>➕</div>
            <div className="fw-semibold mt-2">Add New Wish</div>
          </div>
        </div>
      </div>

      <AddWishModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddWish={handleAddWish}
      />
    </section>
  );
};

export default MyWishlist;
