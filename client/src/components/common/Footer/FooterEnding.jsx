import { Link } from "react-router-dom";
import footerEnding from "../../../assets/data/FooterData/FooterEnding";

const FooterEnding = () => {
  return (
    <div className="footer-ending-container">
      <div className="footer-ending-items">
        {footerEnding?.map((footerEndingItem) => (
          <div key={footerEndingItem.name}>
            <img src={footerEndingItem.image} alt={footerEndingItem.name ?? "footer-ending-image"} loading="lazy" />
            {footerEndingItem.name}
          </div>
        ))}
      </div>
    <div className="ending-policies">
        <Link to="/" title="Terms Of Services" aria-label="Terms Of Services">Term of Services</Link>
        <Link to="/" title="Privacy and Policy" aria-label="Privacy and Policy">Privacy and Policy</Link>
      </div>
      <div>
        All Rights Reserved from
        <Link to="https://devalentineomonya.vercel.app" target="_blank" className="text-green-600 underline mx-3" title="My Portfolio" aria-label="My Portfolio">
          Devalentine
        </Link>
        | {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default FooterEnding;
