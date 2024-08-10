import { BsArrowLeft } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  streetAddress: Yup.string()
    .required("Street Address is required"),
  city: Yup.string()
    .required("City is required"),
  state: Yup.string()
    .required("State/Province is required"),
  postalCode: Yup.string()
    .required("Postal Code is required"),
  primaryPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
    .required("Primary Phone Number is required"),
  secondaryPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
    .nullable(),  // secondaryPhone is optional
  firstName: Yup.string()
    .min(3, 'First Name must be at least 3 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(3, 'Last Name must be at least 3 characters')
    .required('Last Name is required'),
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

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* First Name */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">First Name</legend>
          <input
            type="text"
            name="firstName"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="validation-error">{formik.errors.firstName}</div>
          ) : null}
        </fieldset>

        {/* Last Name */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">Last Name</legend>
          <input
            type="text"
            name="lastName"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="validation-error">{formik.errors.lastName}</div>
          ) : null}
        </fieldset>

        {/* Street Address */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">Street Address</legend>
          <input
            type="text"
            name="streetAddress"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your street address"
            value={formik.values.streetAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.streetAddress && formik.errors.streetAddress ? (
            <div className="validation-error">{formik.errors.streetAddress}</div>
          ) : null}
        </fieldset>

        {/* City */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">City</legend>
          <input
            type="text"
            name="city"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="validation-error">{formik.errors.city}</div>
          ) : null}
        </fieldset>

        {/* State/Province */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">State/Province</legend>
          <input
            type="text"
            name="state"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your state or province"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="validation-error">{formik.errors.state}</div>
          ) : null}
        </fieldset>

        {/* Postal Code */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">Postal Code</legend>
          <input
            type="text"
            name="postalCode"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your postal code"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div className="validation-error">{formik.errors.postalCode}</div>
          ) : null}
        </fieldset>

        {/* Primary Phone Number */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">Primary Phone Number</legend>
          <input
            type="tel"
            name="primaryPhone"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your primary phone number"
            value={formik.values.primaryPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.primaryPhone && formik.errors.primaryPhone ? (
            <div className="validation-error">{formik.errors.primaryPhone}</div>
          ) : null}
        </fieldset>

        {/* Secondary Phone Number */}
        <fieldset className="border p-4 rounded">
          <legend className="px-2 text-lg font-semibold">Secondary Phone Number (Optional)</legend>
          <input
            type="tel"
            name="secondaryPhone"
            className="border rounded p-2 w-full mt-1"
            placeholder="Enter your secondary phone number"
            value={formik.values.secondaryPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.secondaryPhone && formik.errors.secondaryPhone ? (
            <div className="validation-error">{formik.errors.secondaryPhone}</div>
          ) : null}
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default ProfileAddress;
