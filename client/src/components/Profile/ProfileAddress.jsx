import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileAddressInput from "./ProfileAddressInput";

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
    .nullable(),
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  email: Yup.string("The email should be a string")
    .email("Please enter valid email")
    .required("Email is required"),
});

const ProfileAddress = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      primaryPhone: "",
      secondaryPhone: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Set loading to true
      try {
        // Simulate form submission with a timeout
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form Data", values);
      } catch (error) {
        console.error("Submission Error", error);
      } finally {
        setLoading(false); // Set loading to false
      }
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
          <ProfileAddressInput
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
          <ProfileAddressInput
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
        </div>

        <ProfileAddressInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <ProfileAddressInput
            label="Primary Phone Number"
            name="primaryPhone"
            type="tel"
            placeholder="Enter your primary phone number"
            value={formik.values.primaryPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.primaryPhone}
            touched={formik.touched.primaryPhone}
          />
          <ProfileAddressInput
            label="Secondary Phone Number (Optional)"
            name="secondaryPhone"
            type="tel"
            placeholder="Enter your secondary phone number"
            value={formik.values.secondaryPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.secondaryPhone}
            touched={formik.touched.secondaryPhone}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <ProfileAddressInput
            label="State/Province"
            name="state"
            placeholder="Enter your state or province"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.state}
            touched={formik.touched.state}
          />
          <ProfileAddressInput
            label="City"
            name="city"
            placeholder="Enter your city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.city}
            touched={formik.touched.city}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <ProfileAddressInput
            label="Street Address"
            name="streetAddress"
            placeholder="Enter your street address"
            value={formik.values.streetAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.streetAddress}
            touched={formik.touched.streetAddress}
          />
          <ProfileAddressInput
            label="Postal Code"
            name="postalCode"
            placeholder="Enter your postal code"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.postalCode}
            touched={formik.touched.postalCode}
          />
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded hover:bg-black ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-customGreen"}`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default ProfileAddress;
