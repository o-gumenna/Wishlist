import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AddWishModal = ({ show, onClose, onAddWish }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");

  const resetForm = () => {
    setTitle("");
    setImage("");
    setDescription("");
    setLink("");
    setPrice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Будь ласка, увійди, щоб додати бажання ✨");
      return;
    }

    if (!title.trim()) {
      alert("Назва обовʼязкова!");
      return;
    }

    const newWish = {
      id: uuidv4(),
      title,
      image: image || "/placeholder.jpg",
      description,
      price: price ? `${price} ₴` : "—",
      link,
      isCustom: true
    };

    onAddWish(newWish); // 🔁 Передаємо в батьківський компонент
    resetForm();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>✨ Додати нове бажання</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Назва *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Наприклад, Ноутбук Asus Zenbook"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Зображення (URL)</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Опис</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Додаткові деталі, колір, розмір тощо"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Посилання на сайт</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ціна</Form.Label>
            <Form.Control
              type="number"
              placeholder="Наприклад, 4999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" type="submit">
              💾 Зберегти бажання
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWishModal;
