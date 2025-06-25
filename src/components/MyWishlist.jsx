import Header from "./Header";
import AddWishModal from "./AddWishModal";
import LoginModal from "./LoginModal";
import SearchDropdown from "./SearchDropdown";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { notifyLoginRequired } from "../hooks/toastUtils";
import { isLoggedIn } from "../hooks/auth";

import RecommendationCard from "./RecommendationCard";

const MyWishlist = ({ wishes, onUpdate }) => {
  const handleRemove = (id) => {
    const updated = wishes.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    if (onUpdate) onUpdate();
  };

  return (
    <section className="container py-5">
      <h2 className="mb-4 text-center text-white">My Wishlist</h2>

      <div className="row g-4">
        {wishes.map((item) => (
          <div key={item.id} className="col-md-4">
            <RecommendationCard
              gift={item}
              isPersonal
              onRemove={() => handleRemove(item.id)}
              onAdd={onUpdate} // 🔁 автоматичне оновлення після дій
            />
          </div>
        ))}

        {/* ➕ Картка "Add New Wish" у вигляді RecommendationCard */}
        <div className="col-md-4">
          <div
            className="card h-100 shadow-sm custom-card d-flex flex-column justify-content-center align-items-center text-center"
            style={{ cursor: "pointer", minHeight: "250px" }}
            onClick={() =>
              document.dispatchEvent(new CustomEvent("open-add-modal"))
            }
          >
            <div style={{ fontSize: "2.5rem" }}>➕</div>
            <div className="fw-semibold mt-2">Add New Wish</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyWishlist;
