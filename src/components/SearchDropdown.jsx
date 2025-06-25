import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import RecommendationCard from "./RecommendationCard";
import useWishlist from "../hooks/useWishlist";
import { notifyAdded, notifyExists, notifyLoginRequired } from "../hooks/toastUtils";
import { isLoggedIn } from "../hooks/auth";


const SearchDropdown = ({ onAddWish }) => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const { addWish, exists } = useWishlist();

  useEffect(() => {
    fetch("http://localhost:9999/gifts")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handlePreview = (gift) => {
    setSelectedGift(gift);
  };

  const handleAdd = (gift) => {
    if (!isLoggedIn()) {
    notifyLoginRequired();
    return;
  }

    if (!exists(gift)) {
      addWish(gift);
      notifyAdded();
    } else {
      notifyExists();
    }

    notifyAdded;
  };

  return (
    <div className="dropdown">
      <button
        className="btn border border-dark text-dark dropdown-toggle pulse-hover"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Recommendations
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
                Review
              </Button>
              <Button
                size="sm"
                variant="outline-success"
                onClick={() => handleAdd(gift)}
              >
                Add
              </Button>
            </div>
          </li>
        ))}

        {items.length === 0 && (
          <li className="text-muted px-2">No ideas</li>
        )}

        <li className="border-top mt-3 pt-2">
          <div
            className="d-flex justify-content-center text-dark fw-semibold"
            role="button"
            onClick={onAddWish}
          >
            Add your own item
          </div>
        </li>
      </ul>

      {selectedGift && (
        <RecommendationCard
          key={selectedGift.id} // 🔥 ВАЖЛИВО
          gift={selectedGift}
          autoOpen
          onAdd={() => setSelectedGift(null)}
          onRemove={() => setSelectedGift(null)}
        />
      )}

    </div>
  );
};

export default SearchDropdown;
