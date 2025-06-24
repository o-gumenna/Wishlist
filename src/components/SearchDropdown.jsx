import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import RecommendationCard from "./RecommendationCard";

const SearchDropdown = ({ onAddWish }) => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9999/gifts")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handlePreview = (gift) => {
    setSelectedGift(gift);
    setShow(true);
  };

  const handleAdd = (gift) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Будь ласка, увійди, щоб зберігати бажання 💫");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = saved.some((item) => item.id === gift.id);
    
    if (!exists) {
      const updated = [...saved, gift];
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
    console.log("Додано у вішліст:", gift.title);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        🔍 Search
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end p-3 shadow"
        style={{ width: "500px", maxHeight: "400px", overflowY: "auto" }}
      >
        {items.map((gift) => (
          <li key={gift.id} className="mb-2">
            <div className="d-flex align-items-center justify-content-between gap-2">
              <span className="fw-semibold flex-grow-1 text-truncate">
                {gift.title}
              </span>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => handlePreview(gift)}
              >
                Переглянути
              </Button>
              <Button
                size="sm"
                variant="outline-success"
                onClick={() => handleAdd(gift)}
              >
                ➕
              </Button>
            </div>
          </li>
        ))}

        {items.length === 0 && (
          <li className="text-muted px-2">Немає доступних ідей</li>
        )}

        {/* ➕ Add your own item */}
        <li className="border-top mt-3 pt-2">
          <div
            className="d-flex justify-content-center text-success fw-semibold"
            role="button"
            onClick={onAddWish}
          >
            ➕ Add your own item
          </div>
        </li>
      </ul>

      <Modal show={show} onHide={() => setShow(false)} centered>
        {selectedGift && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedGift.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RecommendationCard gift={selectedGift} />
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SearchDropdown;
