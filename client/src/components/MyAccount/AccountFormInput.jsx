import PropTypes from 'prop-types';

const AccountFormInput = ({
  name,
  type,
  value,
  label,
  onInputChange,
  onBlur,
  readOnly,
}) => {
  return (
    <div className="flex flex-col border-gray-300 border-b-2 mt-8">
      <label htmlFor={name} className="text-sm text-gray-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onInputChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className="outline-none border-none w-full h-10 text-gray-600 placeholder:text-gray-300"
        placeholder="Type Here..."
      />
    </div>
  );
};

AccountFormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default AccountFormInput;
