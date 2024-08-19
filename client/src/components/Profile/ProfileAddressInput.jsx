import PropTypes from 'prop-types';

const ProfileAddressInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className="mb-4">
      <fieldset className="border px-4 pb-2 rounded">
        <legend className="px-2 text-md font-medium text-gray-500">
          {label}
        </legend>
        <input
          type={type}
          name={name}
          className={`outline-none border-none rounded p-2 w-full mt-1 ${
            touched && error ? "border-red-500" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </fieldset>
      {touched && error && <div className="validation-error">{error}</div>}
    </div>
  );
};


ProfileAddressInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool.isRequired,
};


ProfileAddressInput.defaultProps = {
  type: 'text',
  placeholder: '',
  error: '',
};

export default ProfileAddressInput;
