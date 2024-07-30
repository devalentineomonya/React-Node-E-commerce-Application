import MainLayout from "../MainLayout/MainLayout";
import navItems from "../../../assets/data/NavbarData/NavItems";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BsCartPlus, BsMenuButton, BsX } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

import logo from "../../../assets/images/logo.svg";
import CustomAlert from "../CustomAlert/CustomAlert";
import useModal from "../../../hooks/useModal";
import CategoryDropDown from "./CategoryDropDown";
const NavbarLower = () => {
  const [searching, setSearching] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [searchValue, setSearchValue] = useState();
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();
  const { isShowing, toggle } = useModal();
  const mobileScreen = window.innerWidth < 992;

  const pagePath = useRef("");
  useEffect(() => {
    if (location.pathname.includes("/")) {
      pagePath.current = location.pathname.split("/")[1];
    } else {
      pagePath.current = location.pathname.substring(1);
    }
  });

  useEffect(() => {
    const currentNavItem = navItems.find(
      (navItem) => navItem.to.substring(1) === pagePath.current
    );
    const index = navItems.indexOf(currentNavItem);
    setActivePage(index);
  }, [pagePath]);

  const handlePageChange = (index) => {
    setActivePage(index);
  };
  const onEnterClick = (event) => {
    if (event.key === "enter") {
      handlePageChange();
    }
  };

  const handleSearchValueChange = (e) => {
    setShowDropDown(false);
    setSearchValue(e.target.value);
  };

  const handleSearchRedirect = () => {
    console.log("Invocked")
    if (!searchValue?.trim()) {
      setSearching(true);
      toggle();
      setTimeout(() => toggle(), 2000);
    } else {
      navigate(`/search?query=${searchValue}`);
    }
  };

  return (
    <MainLayout>
      <div className="navbar-lower-content">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        {window.innerWidth >= 1150 && (
          <CategoryDropDown
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          />
        )}

        {!searching && (
          <nav
            className={`navbar ${searching ? "nav-searching" : ""} ${
              mobileScreen ? "navbar-mobile" : ""
            }
            ${navBarOpen ? "active" : ""}`}
          >
            <div
              className={`close-menu ${!mobileScreen ? "hidden" : ""}`}
              onClick={() => setNavBarOpen(false)}
            >
              <BsX size={40} />
            </div>
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

        <div
          className={`nav-search ${searching ? "searching" : ""} ${
            mobileScreen ? "hidden" : ""
          }`}
        >
          <div
            className={`search-placeholder ${mobileScreen ? "hidden" : ""}`}
            onClick={() => {
              setSearching(true), setShowDropDown(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearching(true);
                setShowDropDown(true);
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
                onBlur={() => {
                  setSearching(false), setShowDropDown(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSearching(false);
                    setShowDropDown(false);
                    handleSearchRedirect();
                  }
                }}
              />
            ) : (
              searchValue ?? "Search Product"
            )}
          </div>

          <div
            className="icon"
            onClick={handleSearchRedirect}
          >
            <AiOutlineSearch size={18} />
          </div>
        </div>
        <div className="nav-left">
          <div
            className={`nav-left-item ${!mobileScreen ? "hidden" : ""}`}
            onClick={() => setSearching(true)}
          >
            <AiOutlineSearch size={18} />
            {searching ? (
              <div className={`${mobileScreen ? "mobile-search" : ""}`}>
                <input
                  autoFocus
                  onChange={handleSearchValueChange}
                  value={searchValue}
                  className={`${searching ? "inline-block" : "hidden"}`}
                  type="text"
                  placeholder="Search Product"
                  onBlur={() => setSearching((prev) => !prev)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setSearching(false);
                      handleSearchRedirect();
                    }
                  }}
                />
                <div className="icon" onClick={handleSearchRedirect}>
                  <AiOutlineSearch size={40} />
                </div>
              </div>
            ) : null}
          </div>
          <Link to="/auth">
            <div className="nav-left-item">
              <AiOutlineUser />
              {!mobileScreen && "Account"}
            </div>
          </Link>
          <Link to="/cart">
            <div className="nav-left-item">
              <BsCartPlus />
              {!mobileScreen && "Cart"}
            </div>
          </Link>
          <div
            className={`nav-left-item ${!mobileScreen ? "hidden" : ""}`}
            onClick={() => setNavBarOpen(true)}
          >
            <BsMenuButton />
          </div>
        </div>
      </div>
      <CustomAlert
        isShowing={isShowing}
        type="warning"
        message="Please Type something to search...! "
        hide={toggle}
        setSearching={setSearching}
      />
    </MainLayout>
  );
};

export default NavbarLower;
