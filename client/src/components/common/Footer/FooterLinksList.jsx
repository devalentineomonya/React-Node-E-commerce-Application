import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const FooterLinksList = ({ title, links }) => {
  return (
    <div className="footer-links-content">
      <h3>{title}</h3>
      <ul>
        {links?.map((link) => (
          <li key={link.name}>
            <Link to={link.href} title={link.name} aria-label={link.name}>{link.name} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
FooterLinksList.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
};
export default FooterLinksList;
