import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const FooterLinksList = ({ title, links }) => {
  return (
    <div className="footer-links-content">
      <h3>{title}</h3>
      <ul>
        {links?.map((link) => (
          <li key={link.name}>
            <Link to={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
FooterLinksList.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
};
export default FooterLinksList;
