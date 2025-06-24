import { useRef, useState } from "react";
import Header from "../src/components/Header";
import HeroSection from "../src/components/HeroSection";
import RecommendationSection from "../src/components/RecommendationSection";
import LoginForm from "../src/components/LoginForm";
import AddWishModal from "../src/components/AddWishModal";



export default function HomePage() {
  const loginRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header
        onLoginClick={() => loginRef.current?.scrollIntoView({ behavior: "smooth" })}
        onAddWish={() => setShowModal(true)}
      />
      <HeroSection onAddWish={() => setShowModal(true)} />
      <AddWishModal show={showModal} onClose={() => setShowModal(false)} />
      <RecommendationSection />
      <LoginForm scrollRef={loginRef} />
    </>
  );
}
