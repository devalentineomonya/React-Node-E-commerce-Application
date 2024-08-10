import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const ProfileUser = () => {
  return (
    <div>
      <div className="profile-page-title">
        <h1>Account Overview</h1>
      </div>
      <div className="profile-user-content">
        <ProfileUserInfoCard />
        <ProfileUserInfoCard />
        <ProfileUserInfoCard />
        <ProfileUserInfoCard />
      </div>
    </div>
  );
};

const ProfileUserInfoCard = () => {
  return (
    <div className="profile-info-card">
      <div className="profile-info-card-title">
        <h2>jfhfk</h2>
        <button title="Edit" aria-label="Edit">
          <BiEditAlt size={20} />
        </button>
      </div>
      <div className="profile-info-card-content">
        <h6>dddjd</h6>
        <p>djddhd</p>
        <Link to="/">sjdhddk</Link>
      </div>
    </div>
  );
};

export default ProfileUser;
