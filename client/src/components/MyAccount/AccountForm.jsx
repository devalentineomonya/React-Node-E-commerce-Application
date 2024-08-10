import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountFormInput from "./AccountFormInput";

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'First Name must be at least 3 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(3, 'Last Name must be at least 3 characters')
    .required('Last Name is required'),
  middleName: Yup.string() 
    .min(3, 'Middle Name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  gender: Yup.string()
  .oneOf(['male', 'female', 'other', 'M', 'F', 'O'], 'Invalid gender')
    .required('Gender is required'),
  dateOfBirth: Yup.date()
    .required('Date of Birth is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits')
    .required('Phone Number is required'),
});

const AccountForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="min-h-[50vh] shadow-lg p-8">
      <div>
        <h2>Profile Details</h2>
        <button type="button">Edit Profile</button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <AccountFormInput
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

        <button type="submit" className="mt-4">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountForm;
