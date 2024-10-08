import MainLayout from "../../layouts/MainLayout/MainLayout";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TextTransition, { presets } from "react-text-transition";
import currencies from "../../../assets/data/NavbarData/Currencies";
import languages from "../../../assets/data/NavbarData/Languages";
import { AiOutlinePhone } from "react-icons/ai";

const NavbarTop = () => {
  const currencyRef = useRef();
  const languageRef = useRef();
  const handleLanguageChange = () => {
    console.log(languageRef.current.value);
  };
  const handleCurrencyChange = () => {
    console.log(currencyRef.current.value);
  };
  const offers = [
    "Get 50% off on selected items",
    "Free delivery on orders over $50",
    "Exclusive vouchers for new customers",
    "Buy 1 get 1 free on all accessories",
    "Limited time: 30% off storewide",
    "Sign up and get a $10 discount",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 1500);

    return () => clearInterval(intervalId);
  }, [offers.length]);
  return (
    <MainLayout bg="bg-customGreen">
      <div className="navbar-top-content ">
        <div className="navbar-top-left">
          <Link to="tel:+254768133220" title="Telephone" aria-label="Telephone">
            <AiOutlinePhone className="icon" />{" "}
            <span className="hidden sm:inline-block">+254768133220</span>
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="hidden md:flex items-center gap-x-2 ">
            <TextTransition
              springConfig={presets.wobbly}
              direction="down"
              className=" min-w-64"
            >
              {offers[index]}
            </TextTransition>
            {" | "}
          </div>
          <Link to="/shop" title="Shop" aria-label="Shop">
            Shop Now
          </Link>
        </div>
        <div className="navbar-top-select-items">
          <select
            title="Currency"
            aria-label="Currency"
            name="currency"
            onChange={handleCurrencyChange}
            ref={currencyRef}
          >
            {currencies?.map((currency) => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
          </select>
          <select
            title="Language"
            aria-label="Language"
            name="language"
            onChange={handleLanguageChange}
            ref={languageRef}
          >
            {languages?.map((language) => (
              <option value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
    </MainLayout>
  );
};

export default NavbarTop;
