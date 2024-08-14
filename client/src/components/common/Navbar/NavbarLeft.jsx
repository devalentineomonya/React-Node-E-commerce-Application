import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { TbUserCheck } from "react-icons/tb";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const NavbarLeft = ({
  mobileScreen,
  setSearching,
  searching,
  setNavBarOpen,
  handleSearchRedirect,
  handleSearchValueChange,
  searchValue,
}) => {
  const user = useSelector((state) => state.auth.user);
  const profileLink = user
    ? user.isVerified
      ? "/profile/me"
      : "/auth/verify"
    : "/auth/login";
  return (
    <div className="nav-left">
      <div
        className={`nav-left-item ${!mobileScreen ? "hidden" : ""}`}
        onClick={() => setSearching((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearching((prev) => !prev);
          }
        }}
      >
        <AiOutlineSearch size={20} />
        {searching && (
          <div className={`${mobileScreen ? "mobile-search" : ""}`}>
            <input
              autoFocus
              onChange={handleSearchValueChange}
              value={searchValue}
              className={`${searching ? "inline-block" : "hidden"}`}
              type="text"
              placeholder="Search Product"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSearching(false);
                  handleSearchRedirect();
                }
              }}
            />
            <div
              className="icon"
              onClick={handleSearchRedirect}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchRedirect();
                }
              }}
            >
              <AiOutlineSearch size={20} />
            </div>
          </div>
        )}
      </div>
      <Link to={profileLink} title="Profile" aria-label="Profile">
        <div className="nav-left-item">
          {user ? (
            <>
              <TbUserCheck size={20} />
              {!mobileScreen && user.firstName}
            </>
          ) : (
            <>
              <AiOutlineUser size={20} />
              {!mobileScreen && "Account"}
            </>
          )}
        </div>
      </Link>
      <Link to="/cart" title="Cart" aria-label="Cart">
        <div className="nav-left-item">
          <BsCartPlus size={20} />
          {!mobileScreen && "Cart"}
        </div>
      </Link>
      <div
        className={`nav-left-item ${!mobileScreen ? "hidden" : ""}`}
        onClick={() => setNavBarOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setNavBarOpen(true);
          }
        }}
      >
        <HiOutlineMenuAlt4 size={20} />
      </div>
    </div>
  );
};

NavbarLeft.propTypes = {
  mobileScreen: PropTypes.bool.isRequired,
  setSearching: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired,
  setNavBarOpen: PropTypes.func.isRequired,
  handleSearchRedirect: PropTypes.func.isRequired,
  handleSearchValueChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

export default NavbarLeft;
