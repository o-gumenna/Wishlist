import Link from "next/link";
import { FaUser } from "react-icons/fa";
import SearchDropdown from "./SearchDropdown";

const Header = ({ onLoginClick, onAddWish }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg header-bg border-bottom px-3">
        <div className="container-fluid">
          
          {/* Назва сайту */}
          <Link href="/" className="navbar-brand site-logo">
            WishForest
          </Link>

          {/* Кнопки праворуч */}
          <div className="d-flex align-items-center gap-3 ms-auto">

            {/* My Wishlist */}
            <Link href="/my-wishlist" className="btn btn-outline-primary">
              My Wishlist
            </Link>

            {/* Search */}
            <SearchDropdown onAddWish={onAddWish} />

            {/* Login іконка */}
            <button className="btn btn-outline-secondary " onClick={onLoginClick} > 
              <FaUser />
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
