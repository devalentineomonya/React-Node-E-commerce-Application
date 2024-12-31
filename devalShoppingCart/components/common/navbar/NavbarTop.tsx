import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import {useRef} from "react";

import currencies from "./currencies";
import languages from "./languages";
import { AiOutlinePhone } from "react-icons/ai";
import { WordRotate } from "@/components/ui/word-rotate";


const NavbarTop = () => {
  const currencyRef = useRef<HTMLSelectElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);

  // Type for the event handler for the currency and language change
  const handleLanguageChange = () => {
    console.log(languageRef.current?.value);
  };

  const handleCurrencyChange = () => {
    console.log(currencyRef.current?.value);
  };




  return (
    <MainLayout bg="bg-primary">
      <div className="flex justify-between items-center text-white h-10 text-sm ">
        <div className="navbar-top-left">
          <Link className="flex justify-center items-center gap-x-2" href="tel:+254768133220" title="Telephone" aria-label="Telephone">
            <AiOutlinePhone className="transform rotate-90" />{" "}
            <span className="hidden sm:inline-block">+254768133220</span>
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="hidden md:flex items-center gap-x-2 ">
          <WordRotate
         className="text-xl font-medium text-black dark:text-white"
         words={[
            "Get 50% off on selected items",
            "Free delivery on orders over $50",
            "Exclusive vouchers for new customers",
            "Buy 1 get 1 free on all accessories",
            "Limited time: 30% off storewide",
            "Sign up and get a $10 discount",
          ]}
      />

            {" | "}
          </div>
          <Link href="/shop" title="Shop" aria-label="Shop">
            Shop Now
          </Link>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <select
            title="Currency"
            aria-label="Currency"
            name="currency"
            className="bg-transparent border-none outline-none"
            onChange={handleCurrencyChange}
            ref={currencyRef}
          >
            {currencies?.map((currency) => (
              <option className="text-slate-950" value={currency} key={currency}>
                {currency}
              </option>
            ))}
          </select>
          <select
            title="Language"
            aria-label="Language"
            name="language"
            className="bg-transparent border-none outline-none"
            onChange={handleLanguageChange}
            ref={languageRef}
          >
            {languages?.map((language) => (
              <option  className="text-slate-950" value={language} key={language}>
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
