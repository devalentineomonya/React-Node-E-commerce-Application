import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavItems = ({ navItems, activePage, handlePageChange, onEnterClick }) => (
  <ul className="nav-items">
    {navItems.map((navItem, i) => (
      <li
        key={navItem.key}
        className={`nav-item ${activePage === i ? 'active' : ''}`}
        onClick={() => handlePageChange(i)}
        onKeyDown={(event) => onEnterClick(event, i)}
        tabIndex={0}
      >
        <Link to={navItem.to} title={navItem.name} aria-label={navItem.name}>{navItem.title}</Link>
        {activePage === i && <hr />}
      </li>
    ))}
  </ul>
);

NavItems.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
  activePage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  onEnterClick: PropTypes.func.isRequired,
};

export default NavItems;
