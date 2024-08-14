import { Link, useNavigate, useParams } from "react-router-dom";
import profileNav from "../../assets/data/ProfileNav/ProfileNav";
import PropTypes from "prop-types"
import { useDispatch } from "react-redux";
import { logout } from "../../../app/features/auth/authSlice";
import { toast } from "react-toastify";
const ProfileNav = ({showProfileNav}) => {
  const { profilePage } = useParams();
const dispatch = useDispatch();
const navigate = useNavigate()

const logoutUser = async ()=>{
  await dispatch(logout());
  toast.success("User Logged out successfully")
  navigate("/")
}
  return (
    <nav  className={`profile-nav ${
        showProfileNav ? "left-0" : "-left-96"
      }`}>
        
        <ul>
          {profileNav.map((navItem, index) => {
            const pathName = navItem.href;

            const path = pathName.substring(9);
            return (
              <li
                key={navItem.name + "-" + index}
                className={`${profilePage === path ? "bg-gray-200" : ""}`}
              >
                {navItem.icon}
                <Link to={navItem.href}>{navItem.name}</Link>
              </li>
            );
          })}
        </ul>
        <Link to="/my-account" className="profile-nav-item">
          Account Management
        </Link>
        <Link to="/profile/address/new" className={`profile-nav-item ${profilePage.includes("address") ? "bg-gray-200" : ""}`}>
          Address Book
        </Link>
        <Link to="/auth/deactivate" className="profile-nav-item">
          Deactivate Account
        </Link>
        <button onClick={logoutUser}>LOGOUT</button>
    </nav>
  );
};
ProfileNav.propTypes = {
    showProfileNav:PropTypes.bool,
}

export default ProfileNav;
