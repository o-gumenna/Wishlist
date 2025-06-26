import Link from "next/link";
import { FaUser } from "react-icons/fa";
import SearchDropdown from "./SearchDropdown";

const Header = ({ onLoginClick, onAddWish, onUpdate }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg px-3">
        <div className="container-fluid">

          <Link href="/" className="navbar-brand pulse-hover">
            WishForest
          </Link>

          <div className="d-flex align-items-center gap-3 ms-auto">

            <Link href="/my-wishlist" className="btn border-dark text-dark pulse-hover">
              My Wishlist
            </Link>

            <SearchDropdown
              onAddOwnWish={onAddWish}
              onUpdate={onUpdate}
            />

            <button className="btn border-dark text-dark pulse-hover" onClick={onLoginClick}>
              <FaUser />
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
