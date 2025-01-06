"use client"
import { useEffect, useRef, useState, useCallback } from "react";
import MainLayout from "../layouts/MainLayout";
import navItems from "./navbaritems";
import NavbarLogo from "./NavbarLogo";
import NavItems from "./NavItems";
import NavbarSearch from "./NavbarSearch";
import NavbarLeft from "./NavbarLeft";
import NavbarMobile from "./NavbarMobile";
import NavCategoryDropDown from "./NavCategoryDropDown";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useBrowserWidth from "@/hooks/useBrowserWidth";
import OneTap from "./OneTap";

const NavbarLower: React.FC = () => {
  const [searching, setSearching] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(0);
  const [navBarOpen, setNavBarOpen] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  const router = useRouter();
  const pagePath = useRef<string>("");

  const {width, isMobile} = useBrowserWidth();


  useEffect(() => {
    const pathname = location.pathname;

    if (pathname.includes("/")) {
      pagePath.current = pathname.split("/")[1] || "";
    } else {
      pagePath.current = pathname.substring(1);
    }
  }, []);

  useEffect(() => {
    const currentNavItem = navItems.find(
      (navItem) => navItem.to.substring(1) === pagePath.current
    );

    if (currentNavItem) {
      const index = navItems.indexOf(currentNavItem);
      setActivePage(index);
    }
  }, [pagePath]);

  const handlePageChange = useCallback((index: number) => {
    setActivePage(index);
  }, []);

  const onEnterClick = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (event.key === "Enter") {
        handlePageChange(index);
      }
    },
    [handlePageChange]
  );

  const handleSearchValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSearchRedirect = useCallback(() => {
    if (!searchValue?.trim()) {
      setSearching(true);
      toast.warning("Please Type something to search...!");
    } else {
      router.push(`/search?query=${searchValue}`);
    }
  }, [searchValue, router, setSearching]);

  return (
    <MainLayout className="overflow-visible sticky top-0 z-40 bg-white shadow-[3px_3px_16.5px_-7.5px_#ccc6c6]">
      <div className="flex items-center justify-between md:gap-x-2 xl:gap-x-8 gap-x-0 mt-3 py-1">
        <NavbarLogo />
        {width >= 1150 && (
          <NavCategoryDropDown
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          />
        )}

        {!searching && (
          <NavbarMobile
            isMobile={isMobile}
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
          isMobile={isMobile}
          handleSearchValueChange={handleSearchValueChange}
          searchValue={searchValue || ""}
          handleSearchRedirect={handleSearchRedirect}
        />
        <NavbarLeft
          isMobile={isMobile}
          setSearching={setSearching}
          searching={searching}
          setNavBarOpen={setNavBarOpen}
          searchValue={searchValue || ""}
          handleSearchRedirect={handleSearchRedirect}
          handleSearchValueChange={handleSearchValueChange}
        />
      </div>
      <OneTap/>
    </MainLayout>
  );
};

export default NavbarLower;
