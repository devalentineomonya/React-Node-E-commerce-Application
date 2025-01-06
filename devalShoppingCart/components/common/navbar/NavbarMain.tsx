"use client";
import NavbarTop from "./NavbarTop";
import NavbarLower from "./NavbarLower";
import { usePathname } from "next/navigation";
import { EXCLUDED_PATHS } from "@/lib/constants";


const NavbarMain = () => {
  const pathname = usePathname();

  // Check if the current pathname is in the excluded paths list
  const shouldDisplayNavbar = !EXCLUDED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      {shouldDisplayNavbar && (
        <>

          <NavbarTop />
          <NavbarLower />

        </>
      )}
    </>
  );
};

export default NavbarMain;
