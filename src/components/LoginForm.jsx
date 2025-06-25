import { useState } from "react";
import LoginModal from "./LoginModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <button
        className="btn btn-outline-secondary"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};
