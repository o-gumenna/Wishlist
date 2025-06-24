import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Авторизація</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {user ? (
          <div className="text-center">
            <p className="mb-1">🔐 Вітаємо, <strong>{user.name}</strong></p>
            <p className="text-muted">{user.email}</p>
            <Button variant="outline-danger" onClick={handleLogout}>
              Вийти
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ім’я</Form.Label>
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
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Увійти
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
