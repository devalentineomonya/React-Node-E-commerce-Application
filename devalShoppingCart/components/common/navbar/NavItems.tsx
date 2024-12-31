import Link from "next/link";
import { useMemo } from "react";
import useBrowserWidth from "@/hooks/useBrowserWidth";

interface NavItem {
  key: string;
  title: string;
  to: string;
}

interface NavItemsProps {
  navItems: NavItem[];
  activePage: number;
  handlePageChange: (index: number) => void;
  onEnterClick: (event: React.KeyboardEvent<HTMLLIElement>, index: number) => void;
}

const NavItems: React.FC<NavItemsProps> = ({
  navItems,
  activePage,
  handlePageChange,
  onEnterClick,
}) => {
  const width = useBrowserWidth();

  // Determine if the screen is mobile
  const isMobile = useMemo(() => width < 992, [width]);

  return (
    <ul
      className={`flex items-center ${
        isMobile ? "flex-col justify-start text-xl" : "justify-center gap-x-8"
      }`}
    >
      {navItems.map((navItem, i) => (
        <li
          key={navItem.key}
          className={` text-gray-600 relative whitespace-nowrap flex justify-center items-center gap-x-1 cursor-pointer before:absolute before:h-[2px] before:bg-primary before:bottom-0 before:w-[0%] hover:before:w-full before:transition-all before:ease-in-out before:duration-300 ${
            activePage === i ? "active" : ""
          }`}
          onClick={() => handlePageChange(i)}
          onKeyDown={(event) => onEnterClick(event, i)}
          tabIndex={0}
        >
          <Link href={navItem.to} title={navItem.title} aria-label={navItem.title}>
            {navItem.title}
          </Link>
          {activePage === i && <hr className="bg-primary h-[3px] w-full" />}
        </li>
      ))}
    </ul>
  );
};

export default NavItems;