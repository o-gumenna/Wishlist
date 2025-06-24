import { useState } from "react";
import Image from "next/image";
import { Modal, Button } from "react-bootstrap";

const RecommendationCard = ({ gift, isPersonal = false, onRemove }) => {
  const [show, setShow] = useState(false);

  const openModal = (e) => {
    if (e.target.tagName.toLowerCase() !== "button") {
      setShow(true);
    }
  };

  const handleAddToWishlist = () => {
    const existing = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyExists = existing.some((item) => item.id === gift.id);
    if (!alreadyExists) {
      const updated = [...existing, gift];
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
    setShow(false);
  };

  return (
    <>
      <div className="card h-100 shadow-sm" role="button" onClick={openModal}>
        <Image
          src={gift.image}
          alt={gift.title}
          width={400}
          height={250}
          className="card-img-top object-fit-cover rounded-top"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{gift.title}</h5>
          <p className="card-text fw-bold">{gift.price}</p>

          {isPersonal ? (
            <Button
              variant="outline-danger"
              className="mt-auto"
              onClick={onRemove}
            >
              🗑 Видалити з мого вішліста
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              className="mt-auto"
              onClick={handleAddToWishlist}
            >
              + Add to Wishlist
            </Button>
          )}
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{gift.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={gift.image}
            alt={gift.title}
            width={500}
            height={300}
            className="img-fluid mb-3 rounded"
          />
          <p>{gift.description}</p>
          <p className="fw-bold">Price: {gift.price}</p>
          {gift.link && (
            <div className="mt-3">
              <a
                href={gift.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary w-100"
              >
                Перейти на сайт
              </a>
            </div>
          )}
        </Modal.Body>

        {!isPersonal && (
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddToWishlist}>
              Add to Wishlist
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default RecommendationCard;
