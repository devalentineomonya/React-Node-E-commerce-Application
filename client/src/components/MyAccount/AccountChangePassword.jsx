import { useFormik } from "formik";
import * as Yup from "yup";
import AccountFormInput from "./AccountFormInput";
import { useChangePasswordMutation } from "../../../app/features/auth/authAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});


const AccountChangePassword = () => {
const [changePassword, {isLoading}] = useChangePasswordMutation()
const user = useSelector(state=>state.auth.user)
  const handlePasswordChange = async (values)=>{
    const newUser = {
      ...values, 
      id:user._id ??   localStorage.getItem('userId') 
     }
    const response = await changePassword(newUser)
    console.log(response)
    if(response?.error){
      toast.error(response.error.data.message)
    }else{
      toast.success(response.data.message)
    }
    

  }
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handlePasswordChange,
  });

  return (
    <div className="p-4 w-full">
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
          <div className="text-red-500 text-sm">
            {formik.errors.currentPassword}
          </div>
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
          <div className="text-red-500 text-sm">
            {formik.errors.newPassword}
          </div>
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
          <div className="text-red-500 text-sm">
            {formik.errors.confirmPassword}
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-4 rounded-md px-6 py-2 bg-green-700 text-white hover:bg-green-600 disabled:bg-slate-700"
        >
          {isLoading ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default AccountChangePassword;
