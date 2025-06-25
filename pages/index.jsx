import { useRef, useState } from "react";
import Header from "../src/components/Header";
import HeroSection from "../src/components/HeroSection";
import RecommendationSection from "../src/components/RecommendationSection";
import LoginModal from "../src/components/LoginModal";
import AddWishModal from "../src/components/AddWishModal";
import { notifyLoginRequired } from "../src/hooks/toastUtils";
import { isLoggedIn } from "../src/hooks/auth";


export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Header
        onLoginClick={() => setShowLogin(true)}
        onAddWish={() => setShowModal(true)}
      />
      <HeroSection onAddWish={() => setShowModal(true)} />
      <AddWishModal show={showModal} onClose={() => setShowModal(false)} />
      <RecommendationSection />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />

      <div className="text-center my-5">
        <button
          className="btn btn-outline-dark btn-wishlist-bottom"
          onClick={() => {
            if (!isLoggedIn()) {
              notifyLoginRequired();
              return;
            }
            window.location.href = "/my-wishlist";
          }}
        >
          go to my wishlist
        </button>
      </div>
    </>
  );
}
