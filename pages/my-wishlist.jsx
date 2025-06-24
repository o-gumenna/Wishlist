import Header from "../src/components/Header";
import MyWishlist from "../src/components/MyWishlist";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AddWishModal from "../src/components/AddWishModal"

const MyWishlistPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Будь ласка, увійди, щоб побачити свій вішліст 💌");
      router.push("/");
    }
  }, []);

  return (
    <>
      <Header />
      <MyWishlist />
      <AddWishModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default MyWishlistPage;
