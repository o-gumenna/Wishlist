import Header from "../src/components/Header";
import MyWishlist from "../src/components/MyWishlist";
import AddWishModal from "../src/components/AddWishModal";
import LoginModal from "../src/components/LoginModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MyWishlistPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [wishes, setWishes] = useState([]);

  const loadWishes = () => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishes(saved);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Будь ласка, увійди, щоб побачити свій вішліст 💌");
      router.push("/");
    } else {
      loadWishes();
    }
  }, []);

  // 👂 слухаємо кастомну подію для відкриття Add-модалки з кнопки
  useEffect(() => {
    const openAddHandler = () => setShowModal(true);
    document.addEventListener("open-add-modal", openAddHandler);
    return () => document.removeEventListener("open-add-modal", openAddHandler);
  }, []);

  return (
    <>
      <Header
        onLoginClick={() => setShowLogin(true)}
        onAddWish={() => setShowModal(true)}
      />

      <MyWishlist wishes={wishes} onUpdate={loadWishes} />

      <AddWishModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddWish={loadWishes}
      />

      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
      />
    </>
  );
};

export default MyWishlistPage;
