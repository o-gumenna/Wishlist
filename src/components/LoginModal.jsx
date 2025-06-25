import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { notifyLoggedIn, notifyLoggedOut } from "../hooks/toastUtils";


const LoginModal = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved) setUser(saved);
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");
    setUser(newUser);
    notifyLoggedIn();
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    notifyLoggedOut();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Authentication</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {user ? (
          <div className="text-center">
            <p className="mb-1">Hi, <strong>{user.name}</strong></p>
            <p className="text-muted">{user.email}</p>
            <Button variant="outline-secondary" onClick={handleLogout}>
              Leave
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="outline-primary">
                Login
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
