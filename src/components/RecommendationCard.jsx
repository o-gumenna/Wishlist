import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal, Button } from "react-bootstrap";
import useWishlist from "../hooks/useWishlist";
import { notifyAdded, notifyExists, notifyRemoved, notifyLoginRequired } from "../hooks/toastUtils";
import { isLoggedIn } from "../hooks/auth";

const RecommendationCard = ({
  gift,
  isPersonal = false,
  onRemove,
  onAdd,
  autoOpen = false,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setShow(true);
    }
  }, [autoOpen]);

  const { addWish, exists } = useWishlist();

  const openModal = (e) => {
    if (e.target.tagName.toLowerCase() !== "button") {
      setShow(true);
    }
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn()) {
      notifyLoginRequired();
      return;
    }

    if (!exists(gift)) {
      addWish(gift);
      notifyAdded();
      if (typeof onAdd === "function") {
        onAdd();
      }
    } else {
      notifyExists();
    }

    setShow(false);
  };


  const handleRemoveFromWishlist = () => {
    if (typeof onRemove === "function") {
      onRemove();
      notifyRemoved();
    }
  };


  return (
    <>
      {!autoOpen && (
        <div
          className="card h-100 shadow-sm custom-card"
          role="button"
          onClick={openModal}
        >
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
                className="btn-delete"
                onClick={handleRemoveFromWishlist}
              >
                Delete from my wishlist
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                className="mt-auto"
                onClick={handleAddToWishlist}
              >
                + Add to my wishlist
              </Button>
            )}
          </div>
        </div>
      )}

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
                Link
              </a>
            </div>
          )}
        </Modal.Body>
        {!isPersonal && (
          <Modal.Footer className="justify-content-center">
            <Button variant="outline-dark" onClick={handleAddToWishlist}>
              + Add to my wishlist
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default RecommendationCard;
