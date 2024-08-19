import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountFormInput from './AccountFormInput';

// Define the validation schema
const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
    .required("Confirm password is required"),
});

// Main component
const AccountChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form Data', values);
      // Handle form submission here
    },
  });

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Change Password</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <AccountFormInput
          name="currentPassword"
          type="password"
          value={formik.values.currentPassword}
          label="Current Password"
          onInputChange={formik.handleChange}
          readOnly={false}
        />
        {formik.touched.currentPassword && formik.errors.currentPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.currentPassword}</div>
        ) : null}

        <AccountFormInput
          name="newPassword"
          type="password"
          value={formik.values.newPassword}
          label="New Password"
          onInputChange={formik.handleChange}
          readOnly={false}
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.newPassword}</div>
        ) : null}

        <AccountFormInput
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          label="Confirm Password"
          onInputChange={formik.handleChange}
          readOnly={false}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        ) : null}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default AccountChangePassword;
