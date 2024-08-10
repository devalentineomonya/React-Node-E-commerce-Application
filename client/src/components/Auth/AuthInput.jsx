import PropTypes from "prop-types";
import {  useState } from "react";

const AuthInput = ({
  type,
  name,
  label,
  index,
  value,
  onInputChange,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };


  const handleChange = (e) => {
    onInputChange(e);
    if (e.target.value) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  };

  return (
    <div className="login-signup-field">
      <div className="login-signup-input">
        <label
          htmlFor={`${name}-${index}`}
          className={`floating-label ${isFocused || value ? 'active' : ''}`}
        >
          {label}
        </label>
        <input
          type={type ?? "text"}
          name={name}
          id={`${name}-${index}`}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
  
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
