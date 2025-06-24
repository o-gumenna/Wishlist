import Link from "next/link";
import { FaUser } from "react-icons/fa";
import SearchDropdown from "./SearchDropdown";

const Header = ({ onLoginClick, onAddWish }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg header-bg border-bottom px-3">
        <div className="container-fluid">
          
          <Link href="/" className="navbar-brand site-logo">
            WishForest
          </Link>

          <div className="d-flex align-items-center gap-3 ms-auto">

            <Link href="/my-wishlist" className="btn border border-dark text-dark">
              My Wishlist
            </Link>

            <SearchDropdown onAddWish={onAddWish} />

            <button className="btn border border-dark text-dark" onClick={onLoginClick} > 
              <FaUser />
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
