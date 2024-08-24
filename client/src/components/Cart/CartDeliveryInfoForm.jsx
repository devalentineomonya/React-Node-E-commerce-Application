import { useFormik } from "formik";
import * as Yup from "yup";
import deliveryInfoInputs from "../../assets/data/DeliveryInfo/DeliveryInfo";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  address: Yup.string()
    .required("Address is required"),
  town: Yup.string()
    .required("Town is required"),
  zip: Yup.string()
    .matches(/^[0-9]{5}$/, "ZIP must be exactly 5 digits")
    .required("ZIP is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
    .required("Phone Number is required"),
});

const CartDeliveryInfoForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      town: "",
      zip: "",
      email: "",
      number: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="delivery-form-container">
      <form onSubmit={formik.handleSubmit} method="post">
        <div className="form-button-container">
          <h5>Delivery Information</h5>
          <button
            type="submit"
            title="Save Information"
            aria-label="Save Information"
          >
            Save Information
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {deliveryInfoInputs?.slice(0, 2)?.map(({ name, label, type }) => (
            <div key={name} className="input-item">
              <label htmlFor={name}>{label}</label>
              <input
                autoComplete="true"
                id={name}
                value={formik.values[name]}
                type={type ?? "text"}
                name={name}
                placeholder="Type here... "
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[name] && formik.errors[name] && (
                <div className="validation-error">{formik.errors[name]}</div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full">
          {deliveryInfoInputs?.slice(2, 3)?.map(({ name, label, type }) => (
            <div key={name} className="input-item">
              <label htmlFor={name}>{label}</label>
              <input
                autoComplete="true"
                id={name}
                value={formik.values[name]}
                type={type ?? "text"}
                name={name}
                placeholder="Type here... "
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[name] && formik.errors[name] && (
                <div className="validation-error">{formik.errors[name]}</div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-x-4">
          {deliveryInfoInputs
            ?.slice(3, deliveryInfoInputs.length)
            ?.map(({ name, label, type }) => (
              <div key={name} className="input-item">
                <label htmlFor={name}>{label}</label>
                <input
                  autoComplete="true"
                  id={name}
                  value={formik.values[name]}
                  type={type ?? "text"}
                  name={name}
                  placeholder="Type here... "
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[name] && formik.errors[name] && (
                  <div className="validation-error">{formik.errors[name]}</div>
                )}
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default CartDeliveryInfoForm;
