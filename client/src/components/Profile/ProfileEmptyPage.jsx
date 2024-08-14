import { Link } from "react-router-dom";
import PropTypes from "prop-types"
const ProfileEmptyPage = ({message, description, icon}) => {
  return (
    <div className="w-full h-full flex justify-center items-center mt-20 flex-col">
      <div className="w-24 h-24 rounded-full bg-gray-100  flex justify-center items-center ">
        {icon}
      </div>
        <h6 className="mt-4 font-medium text-md text-gray-500">{message}</h6>
        <p className="mt-3 font-medium text-sm text-gray-400">
          {description}
        </p>
        <button className="px-5 py-2 rounded-sm bg-customGreen text-white mt-6 shadow-md"><Link to="/shop">CONTINUE SHOPPING</Link></button>
    </div>
  );
};
ProfileEmptyPage.propTypes = {
  message:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired,
  icon:PropTypes.node.isRequired,
}
export default ProfileEmptyPage;
