import { BsArrowLeft } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State/Province is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  primaryPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
    .required("Primary Phone Number is required"),
  secondaryPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
    .nullable(), // secondaryPhone is optional
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
});

const ProfileAddress = () => {
  const formik = useFormik({
    initialValues: {
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      primaryPhone: "",
      secondaryPhone: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data", values);
    },
  });

  return (
    <div>
      <div className="profile-page-title">
        <h1 className="flex gap-x-3 items-center">
          <BsArrowLeft size={20} />
          Add Address
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4 mt-5 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                First Name
              </legend>
              <input
                type="text"
                name="firstName"
                className="outline-none border-none border rounded p-2 w-full mt-1"
                placeholder="Enter your first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </fieldset>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="validation-error">{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                Last Name
              </legend>
              <input
                type="text"
                name="lastName"
                className="outline-none border-none border rounded p-2 w-full mt-1"
                placeholder="Enter your last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </fieldset>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="validation-error">{formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                Primary Phone Number
              </legend>
              <input
                type="tel"
                name="primaryPhone"
                className="outline-none border-none border rounded p-2 w-full mt-1"
                placeholder="Enter your primary phone number"
                value={formik.values.primaryPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </fieldset>
            {formik.touched.primaryPhone && formik.errors.primaryPhone ? (
              <div className="validation-error">
                {formik.errors.primaryPhone}
              </div>
            ) : null}
          </div>
          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                Secondary Phone Number (Optional)
              </legend>
              <input
                type="tel"
                name="secondaryPhone"
                className="outline-none border-none border rounded p-2 w-full mt-1"
                placeholder="Enter your secondary phone number"
                value={formik.values.secondaryPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </fieldset>
            {formik.touched.secondaryPhone && formik.errors.secondaryPhone ? (
              <div className="validation-error">
                {formik.errors.secondaryPhone}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                State/Province
              </legend>
              <input
                type="text"
                name="state"
                className="outline-none border-none  rounded p-2 w-full mt-1"
                placeholder="Enter your state or province"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </fieldset>
            {formik.touched.state && formik.errors.state ? (
              <div className="validation-error">{formik.errors.state}</div>
            ) : null}
          </div>

          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                City
              </legend>
              <input
                type="text"
                name="city"
                className="outline-none border-none  rounded p-2 w-full mt-1"
                placeholder="Enter your city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="validation-error">{formik.errors.city}</div>
              ) : null}
            </fieldset>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                Street Address
              </legend>
              <input
                type="text"
                name="streetAddress"
                className="outline-none border-none  rounded p-2 w-full mt-1"
                placeholder="Enter your street address"
                value={formik.values.streetAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </fieldset>
            {formik.touched.streetAddress && formik.errors.streetAddress ? (
              <div className="validation-error">
                {formik.errors.streetAddress}
              </div>
            ) : null}
          </div>
          <div>
            <fieldset className="border px-4 pb-2 rounded mt-4 md:mt-0">
              <legend className="px-2 text-md font-medium text-gray-500 ">
                Postal Code
              </legend>
              <input
                type="text"
                name="postalCode"
                className="outline-none border-none  rounded p-2 w-full mt-1"
                placeholder="Enter your postal code"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </fieldset>
            {formik.touched.postalCode && formik.errors.postalCode ? (
              <div className="validation-error">{formik.errors.postalCode}</div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-customGreen text-white rounded hover:bg-black"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default ProfileAddress;
