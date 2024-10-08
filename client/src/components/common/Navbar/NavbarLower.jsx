import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import navItems from "../../../assets/data/NavbarData/NavItems";
import NavbarLogo from "./NavbarLogo";
import NavItems from "./NavItems";
import NavbarSearch from "./NavbarSearch";
import NavbarLeft from "./NavbarLeft";
import NavbarMobile from "./NavbarMobile";
import NavCategoryDropDown from "./NavCategoryDropDown";
import { toast } from "react-toastify";
import { useBrowserWidth } from "../../../../context/BrowserWidthContext";

const NavbarLower = () => {
  const [searching, setSearching] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate();
  const pagePath = useRef("");
  const {width} = useBrowserWidth()

  const mobileScreen = useMemo(() => window.innerWidth < 992, []);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("/")) {
      pagePath.current = pathname.split("/")[1];
    } else {
      pagePath.current = pathname.substring(1);
    }
  }, []);

  useEffect(() => {
    const currentNavItem = navItems.find(
      (navItem) => navItem.to.substring(1) === pagePath.current
    );
    const index = navItems.indexOf(currentNavItem);
    setActivePage(index);
  }, [pagePath]);

  const handlePageChange = useCallback((index) => {
    setActivePage(index);
  }, []);

  const onEnterClick = useCallback(
    (event, index) => {
      if (event.key === "Enter") {
        handlePageChange(index);
      }
    },
    [handlePageChange]
  );

  const handleSearchValueChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSearchRedirect = useCallback(() => {
    if (!searchValue.trim()) {
      setSearching(true);
      toast.warning("Please Type something to search...! ")
    
    } else {
      navigate(`/search?query=${searchValue}`);
    }
  }, [searchValue, navigate, setSearching]);
  return (
    <MainLayout overflow>
      <div className="navbar-lower-content">
        <NavbarLogo />
        {width >= 1150 && (
          <NavCategoryDropDown
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          />
        )}

        {!searching && (
          <NavbarMobile
            mobileScreen={mobileScreen}
            setNavBarOpen={setNavBarOpen}
            navBarOpen={navBarOpen}
          >
            <NavItems
              navItems={navItems}
              activePage={activePage}
              handlePageChange={handlePageChange}
              onEnterClick={onEnterClick}
            />
          </NavbarMobile>
        )}

        <NavbarSearch
          searching={searching}
          setSearching={setSearching}
          mobileScreen={mobileScreen}
          handleSearchValueChange={handleSearchValueChange}
          searchValue={searchValue}
          handleSearchRedirect={handleSearchRedirect}
        />
        <NavbarLeft
          mobileScreen={mobileScreen}
          setSearching={setSearching}
          searching={searching}
          setNavBarOpen={setNavBarOpen}
          searchValue={searchValue}
          handleSearchRedirect={handleSearchRedirect}
          handleSearchValueChange={handleSearchValueChange}
        />
      </div>
 
    </MainLayout>
  );
};

NavbarLower.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ),
};

export default NavbarLower;
