import { Link } from "react-router-dom";
import footerEnding from "../../../assets/data/FooterData/FooterEnding";

const FooterEnding = () => {
  return (
    <div className="footer-ending-container">
      <div className="footer-ending-items">
        {footerEnding?.map((footerEndingItem) => (
          <div key={footerEndingItem.name}>
            <img src={footerEndingItem.image} alt={footerEndingItem.name} />
            {footerEndingItem.name}
          </div>
        ))}
      </div>
    <div className="ending-policies">
        <Link to="/">Term of Services</Link>
        <Link to="/">Privacy and Policy</Link>
      </div>
      <div>
        All Rights Reserved from
        <Link to="https://devalentineomonya.vercel.app" target="_blank" className="text-green-600 underline mx-3">
          Devalentine
        </Link>
        | {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default FooterEnding;
