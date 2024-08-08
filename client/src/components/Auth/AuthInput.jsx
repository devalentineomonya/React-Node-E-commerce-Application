import PropTypes from "prop-types";
const AuthInput = ({ type, name, label, index, value, onInputChange }) => {
  return (
    <div className="login-signup-field">
      <label htmlFor={`${name}-${index}`}>{label}</label>
      <input
        type={type ?? "text"}
        name={name}
        id={`${name}-${index}`}
        value={value}
        onChange={onInputChange}
        placeholder="Type Here ..."
      />
    </div>
  );
};

AuthInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  index: PropTypes.number.isRequired,
  value: PropTypes.string,
  onInputChange: PropTypes.func,
};
export default AuthInput;
