import { BsX } from 'react-icons/bs';
import PropTypes from 'prop-types';

const NavbarMobile = ({ mobileScreen, setNavBarOpen, navBarOpen, children }) => (
  <nav className={`navbar ${mobileScreen ? 'navbar-mobile' : ''} ${navBarOpen ? 'active' : ''}`}>
    <div className={`close-menu ${!mobileScreen ? 'hidden' : ''}`} onClick={() => setNavBarOpen(false)}>
      <BsX size={40} />
    </div>
    {children}
  </nav>
);

NavbarMobile.propTypes = {
  mobileScreen: PropTypes.bool.isRequired,
  setNavBarOpen: PropTypes.func.isRequired,
  navBarOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavbarMobile;
