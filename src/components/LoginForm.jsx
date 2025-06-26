import { useState } from "react";
import LoginModal from "./LoginModal";
import { Button } from "react-bootstrap";


const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => setShowLogin(true)}
      >
        Login
      </Button>
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};
