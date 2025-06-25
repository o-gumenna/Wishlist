import { useState } from "react";
import LoginModal from "./LoginModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <button
        variant="outline-primary"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};
