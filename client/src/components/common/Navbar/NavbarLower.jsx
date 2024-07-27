import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import navItems from "../../../assets/data/NavbarData/NavItems";
import { Link } from "react-router-dom";
import { AiFillShopping, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

const NavbarLower = () => {
  return (
    <MainLayout>
      <div className="navbar-lower-content">
        <div className="logo">
          <AiFillShopping size={30} />
          <h1>SHOPPE</h1>
        </div>
        <nav className="navbar">
          <ul className="nav-items">
            {navItems?.map((navItem) => (
              <li key={navItem.key} className="nav-item">
                <Link to={navItem.to}>{navItem.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-search">
          <input type="text" placeholder="Search Product" />
          <AiOutlineSearch />
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
