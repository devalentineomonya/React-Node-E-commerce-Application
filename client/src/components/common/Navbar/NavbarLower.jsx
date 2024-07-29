import MainLayout from "../MainLayout/MainLayout";
import navItems from "../../../assets/data/NavbarData/NavItems";
import { Link } from "react-router-dom";
import { AiFillShopping, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

import logo from "../../../assets/images/logo.svg";
const NavbarLower = () => {
  const [searching, setSearching] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const searchRef = useRef();
  const handlePageChange = (index) => {
    setActivePage(index);
  };
  const onEnterClick = (event) => {
    if (event.key === "enter") {
      handlePageChange();
    }
  };
  useEffect(() => {
    const currentNavItem = navItems.find(
      (navItem) => navItem.to === location.pathname
    );
    const index = navItems.indexOf(currentNavItem);
    setActivePage(index);
  }, []);
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchRedirect = () => {
    if (searchValue.trim) {
      console.log("Hello");
    }
  };

  return (
    <MainLayout>
      <div className="navbar-lower-content">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        {!searching && (
          <nav className={`navbar ${searching ? "nav-searching" : ""}`}>
            <ul className="nav-items">
              {navItems?.map((navItem, i) => (
                <li
                  key={navItem.key}
                  className={`nav-item`}
                  onClick={() => handlePageChange(i)}
                  onKeyDown={onEnterClick}
                >
                  <Link to={navItem.to}>{navItem.title}</Link>
                  {activePage === i && <hr />}
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className={`nav-search ${searching ? "searching" : ""}`}>
          <div
            className="search-placeholder"
            onClick={() => setSearching(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearching(true);
              }
            }}
          >
            {searching ? (
              <input
                autoFocus
                onChange={handleSearchValueChange}
                value={searchValue}
                className={`${searching ? "inline-block" : "hidden"}`}
                type="text"
                placeholder="Search Product"
                onBlur={() => setSearching(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSearching(false);
                    handleSearchRedirect;
                  }
                }}
              />
            ) : (
              searchValue ?? "Search Product"
            )}
          </div>

          <div className="icon">
            <AiOutlineSearch size={18} />
          </div>
        </div>
        <div className="nav-left">
          <div className="nav-left-item">
            <AiOutlineUser />
            Account
          </div>
          <div className="nav-left-item">
            <BsCartPlus />
            Cart
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NavbarLower;
