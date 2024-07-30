import { useRef } from "react";
import MainLayout from "../MainLayout/MainLayout";
import { Link } from "react-router-dom";
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
  const smallScreen = window.innerHeight < 420
  return (
    <MainLayout bg="bg-customGreen">
      <div className="navbar-top-content ">
        <div className="navbar-top-left">
          <Link to="tel:+254768133220">
            <AiOutlinePhone className="icon" /> +254768133220
          </Link>
        </div>
        <p>
          <span className={`${smallScreen ? "hidden" : ""}`}>Get 50% off on selected items  |</span>  <Link to="/shop"> Shop Now</Link>
        </p>
        <div className="navbar-top-select-items">
          <select
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
