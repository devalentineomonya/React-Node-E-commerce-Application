import { BsX } from "react-icons/bs";
import { ReactNode, KeyboardEvent } from "react";

interface NavbarMobileProps {
    isMobile: boolean;
  setNavBarOpen: (isOpen: boolean) => void;
  navBarOpen: boolean;
  children: ReactNode;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({
  isMobile,
  setNavBarOpen,
  navBarOpen,
  children,
}) => (
  <nav
    className={`flex items-center justify-center gap-x- ${isMobile ? "fixed -top-52 w-[calc(100%-20px)] h-0 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 py-5 rounded-md shadow-md z-10" : ""} ${
      navBarOpen ? "h-72 mt-32 top-10" : ""
    }`}
  >
    <div
      className={`absolute top-2 right-2 cursor-pointer ${!isMobile ? "hidden" : ""}`}
      onClick={() => setNavBarOpen(false)}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          setNavBarOpen(false);
        }
      }}
      tabIndex={0}
    >
      <BsX size={40} />
    </div>
    {children}
  </nav>
);

export default NavbarMobile;
