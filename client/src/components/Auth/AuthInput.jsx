import PropTypes from "prop-types";
const AuthInput = ({
  type,
  name,
  label,
  index,
  value,
  onInputChange,
  icon,
}) => {
  return (
    <div className="login-signup-field">
      <div className="login-signup-input">
      <label htmlFor={`${name}-${index}`}>{label}</label>
        <input
          type={type ?? "text"}
          name={name}
          id={`${name}-${index}`}
          value={value}
          onChange={onInputChange}
          // placeholder="Type Here ..."
        />
        {icon}
      </div>
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
  icon: PropTypes.element,
};
export default AuthInput;
