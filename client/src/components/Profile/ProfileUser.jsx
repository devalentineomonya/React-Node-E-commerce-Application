import { BiEditAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"
import { useSelector } from "react-redux";
const ProfileUser = () => {
  const user = useSelector(state=>state.auth.user)
  return (
    <div>
      <div className="profile-page-title">
        <h1>Account Overview</h1>
      </div>
      <div className="profile-user-content">
        
        <ProfileUserInfoCard title="Account Details" info={`${user?.firstName} - ${user?.lastName} `} description={user?.email} editLink="/my-account"/>
        <ProfileUserInfoCard />
        <ProfileUserInfoCard />
        <ProfileUserInfoCard />
      </div>
    </div>
  );
};

const ProfileUserInfoCard = ({title, info, description, link, linkName,editLink}) => {
  const navigate = useNavigate()
  return (
    <div className="profile-info-card">
      <div className="profile-info-card-title">
        <h2>{title}</h2>
        <button title="Edit" aria-label="Edit" onClick={()=>navigate(editLink)} className="text-orange-500">
          <BiEditAlt size={20} />
        </button>
      </div>
      <div className="profile-info-card-content">
        <h6 className="text-md font-medium text-gray-500 mt-2 ">{info}</h6>
        <p className="text-sm font-normal text-gray-400 mt-2">{description}</p>
        {link &&  <Link to={link}>{linkName}</Link>}
      </div>
    </div>
  );
};
ProfileUserInfoCard.propTypes = {
  title:PropTypes.string.isRequired,
  info:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired,
  editLink:PropTypes.string.isRequired,
  link:PropTypes.string,
  linkName:PropTypes.string,
}
export default ProfileUser;
