import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import useWishlist from "../hooks/useWishlist";
import { notifyLoginRequired, notifyFormError, notifyAdded } from "../hooks/toastUtils";
import { isLoggedIn } from "../hooks/auth";

const AddWishModal = ({ show, onClose, onAddWish }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [showLinkField, setShowLinkField] = useState(false);

  const { addWish } = useWishlist();

  const resetForm = () => {
    setTitle("");
    setImage("");
    setFileName("No file chosen");
    setDescription("");
    setLink("");
    setPrice("");
    setShowLinkField(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      notifyLoginRequired();
      return;
    }

    if (!title.trim()) {
      notifyFormError();
      return;
    }

    const newWish = {
      id: uuidv4(),
      title,
      image: image || "/placeholder.jpg",
      description,
      price: price ? `${price} ₴` : "—",
      link,
      isCustom: true,
    };

    addWish(newWish);
    notifyAdded();

    if (typeof onAddWish === "function") {
      onAddWish(newWish);
    }

    resetForm();
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("No file chosen");
      setImage("");
    }
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
              placeholder="For example, Laptop"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Picture</Form.Label>
            <div className="d-flex align-items-center">
              <label
                htmlFor="customFileUpload"
                className="btn btn-outline-primary me-3 mb-0"
              >
                Choose file
              </label>
              <Form.Control
                type="file"
                id="customFileUpload"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span className="text-muted">{fileName}</span>
            </div>
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
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="For example, 4999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Add a link to the item"
              checked={showLinkField}
              onChange={(e) => {
                setShowLinkField(e.target.checked);
                if (!e.target.checked) setLink("");
              }}
            />
          </Form.Group>

          {showLinkField && (
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>
          )}

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
