import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
const OptInput = ({ length = 6, onOtpSubmit = () => {} }) => {
  const [otpValue, setOtpValue] = useState(new Array(length).fill(""));

  const inputRefs = useRef([]);

  const onOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtpValue = [...otpValue];
    newOtpValue[index] = value.substring(value.length - 1);
    setOtpValue(newOtpValue);
    const combinedOtp = newOtpValue.join("");
    console.log(combinedOtp);
    if (combinedOtp.length === length) {
      return onOtpSubmit(combinedOtp);
    }
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const onOtpClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !setOtpValue[index - 1]) {
      inputRefs.current[otpValue.indexOf("")].focus();
    }
  };

  const onOtpKeyDown = (e, index) => {
    onOtpClick(index);
    switch (e.key) {
      case "Backspace":
        if (!otpValue[index] && index > 0 && inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
        break;

      case "Delete":
        break;
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const word = "q";
  console.log(word.substring(word.length - 1));
  return (
    <div>
      {otpValue?.map((value, index) => (
        <input
          key={index}
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
          type="text"
          value={value}
          onChange={(e) => onOtpChange(e, index)}
          onClick={() => onOtpClick(index)}
          onKeyDown={(e) => onOtpKeyDown(e, index)}
          className="w-12 h-12 border-2 border-gray-300 rounded-md mr-2 outline-none text-center   "
        />
      ))}
    </div>
  );
};
OptInput.propTypes = {
  length: PropTypes.number.isRequired,
  onOtpSubmit: PropTypes.func.isRequired,
};

export default OptInput;
