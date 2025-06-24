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

    onAddWish(newWish);
    resetForm();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a new wish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="For example, Laptop Asus Zenbook"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Picture (URL)</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Additional information"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="For example, 4999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid">
            <Button className="btn-wish" type="submit">
              save a new wish
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWishModal;
