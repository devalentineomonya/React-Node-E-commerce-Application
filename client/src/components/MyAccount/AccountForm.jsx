import { useFormik } from "formik";
import * as Yup from "yup";
import AccountFormInput from "./AccountFormInput";
import { subYears } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../../app/features/user/userAPI";
import { toast } from "react-toastify";
import { setUser } from "../../../app/features/auth/authSlice";
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  middleName: Yup.string().min(3, "Middle Name must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other", "M", "F", "O"], "Invalid gender")
    .required("Gender is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .test("age", "You must be at least 16 years old", function (value) {
      const today = new Date();
      const minAge = subYears(today, 16);
      return value <= minAge;
    }),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
    .required("Phone Number is required"),
});

const AccountForm = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onFormSubmit = async (values) => {
    const newValues = {
      ...values,
      id: user._id ?? localStorage.getItem("userId"),
    };
    const response = await updateUser(newValues);

    if (response?.error) {
      toast.error(response.error.data.message);
    } else {
      console.log(response.data.data)
      await dispatch(setUser(response.data.data));
      toast.success(response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      middleName: user?.middleName ?? "",
      email: user?.email ?? "",
      gender: user?.gender ?? "",
      dateOfBirth: user?.dateOfBirth ?? "",
      phoneNumber: user?.primaryPhoneNumber ?? "",
    },
    validationSchema,
    onSubmit: onFormSubmit,
  });

  const [editForm, setEditForm] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-[50vh] shadow-lg p-8 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <BsArrowLeft
            size={30}
            onClick={() => navigate("/profile/me")}
            className="cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-gray-800 ">
            Profile Details
          </h2>
        </div>
        <button
          className="bg-gray-50 text-orange-600 px-3 py-1 text-lg font-medium"
          onClick={() => setEditForm((prev) => !prev)}
        >
          {editForm ? "Lock Form" : "Edit Form"}
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        onChange={() => setFormChanged(true)}
      >
        <div>
          <AccountFormInput
            readOnly={!editForm}
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="validation-error">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div>
          <AccountFormInput
            readOnly={!editForm}
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="validation-error">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div>
          <AccountFormInput
            readOnly={!editForm}
            name="middleName"
            label="Middle Name"
            value={formik.values.middleName}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.middleName && formik.errors.middleName ? (
            <div className="validation-error">{formik.errors.middleName}</div>
          ) : null}
        </div>

        <div>
          <AccountFormInput
            readOnly={!editForm}
            name="email"
            label="Email"
            value={formik.values.email}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="validation-error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <AccountFormInput
            readOnly={!editForm}
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.gender && formik.errors.gender ? (
            <div className="validation-error">{formik.errors.gender}</div>
          ) : null}
        </div>

        <div>
          <AccountFormInput
            readOnly={!editForm}
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={formik.values.dateOfBirth}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <div className="validation-error">{formik.errors.dateOfBirth}</div>
          ) : null}
        </div>

        <div>
          <AccountFormInput
            readOnly={!editForm}
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="validation-error">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        {editForm && (
          <button
            type="submit"
            className="mt-4 rounded-md px-6 py-2 bg-green-700 text-white hover:bg-green-600 disabled:bg-slate-700"
            disabled={!formChanged}
          >
            {isLoading ? (
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Save Changes"
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default AccountForm;
