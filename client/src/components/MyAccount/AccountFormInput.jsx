import PropTypes from "prop-types";
const AccountFormInput = ({ name, index, type, value,label, onInputChange }) => {
  return (
    <div className="flex flex-col  border-gray-300 border-b-2 mt-8">
      <label htmlFor={`${name}-${index}`} className="text-sm text-gray-400 ">{label}</label>
      <input
      className="outline-none border-none w-full h-10 text-gray-600 placeholder:text-gray-300"
        type={type ?? "text"}
        name={name}
        id={`${name}-${index}`}
        value={value}
        onChange={onInputChange}
        placeholder="Type Here..."
      />
    </div>
  );
};

AccountFormInput.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  label:PropTypes.string,
  onInputChange: PropTypes.func,
};
export default AccountFormInput;
