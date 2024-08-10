import { BiUserCircle } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
const AccountNav = ({ showProfileNav }) => {
  return (
    <nav className={`profile-nav ${showProfileNav ? "left-0" : "-left-96"}`}>
      <div className="h-12 w-full px-3 flex items-center gap-x-2 bg-gray-200 uppercase font-semibold text-sm text-gray-600">
        <BiUserCircle />
        Profile Details
      </div>

      <Link to="/my-account" className="profile-nav-item">
        Basic Details
      </Link>
      <div className="h-12 w-full px-3 flex items-center gap-x-2 bg-gray-200 uppercase font-semibold text-sm text-gray-600">
        <BsGear />
        Security Setting
      </div>
      <Link to="/my-account" className="profile-nav-item">
        Change Password
      </Link>
      <Link
        to="/auth/deactivate"
        className="h-12 w-full px-3 flex items-center hover:bg-gray-100 text-red-600 font-medium text-center"
      >
        Delete Account
      </Link>
    </nav>
  );
};
AccountNav.propTypes = {
    showProfileNav:PropTypes.bool,
}


export default AccountNav;
