import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

const LoginForm = ({ scrollRef }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAlreadyLoggedIn(!!user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      const user = { name, email };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      alert(`Привіт, ${name}! Ти увійшла успішно 💫`);
      setName("");
      setEmail("");
      setPassword("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <section ref={scrollRef} className="py-5">
      <Container style={{ maxWidth: "500px" }}>
        <h3 className="mb-4 text-center">Log in to Your Wishforest</h3>

        {alreadyLoggedIn ? (
          <div className="border rounded p-4 text-center">
            <p className="mb-1">
              🔒 Уже залогінено як{" "}
              <strong>{JSON.parse(localStorage.getItem("user")).name}</strong>
            </p>
            <p className="text-muted">
              {JSON.parse(localStorage.getItem("user")).email}
            </p>
            <Button variant="outline-danger" onClick={handleLogout}>
              Вийти
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="border rounded p-4">
            <Form.Group className="mb-3">
              <Form.Label>Імʼя</Form.Label>
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
      </Container>
    </section>
  );
};

export default LoginForm;
