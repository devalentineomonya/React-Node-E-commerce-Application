import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import deliveryInfoInputs from "./deliveryInfo";

// Define the validation schema using Zod
const validationSchema = z.object({
  firstName: z.string()
    .min(3, "First Name must be at least 3 characters")
    .nonempty("First Name is required"),
  lastName: z.string()
    .min(3, "Last Name must be at least 3 characters")
    .nonempty("Last Name is required"),
  address: z.string()
    .nonempty("Address is required"),
  town: z.string()
    .nonempty("Town is required"),
  zip: z.string()
    .length(5, "ZIP must be exactly 5 digits")
    .regex(/^[0-9]{5}$/, "ZIP must be exactly 5 digits")
    .nonempty("ZIP is required"),
  email: z.string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  number: z.string()
    .length(10, "Phone Number must be exactly 10 digits")
    .regex(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
    .nonempty("Phone Number is required"),
});

// Infer the type from the validation schema
type FormValues = z.infer<typeof validationSchema>;

const CartDeliveryInfoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      town: "",
      zip: "",
      email: "",
      number: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  };

  return (
    <div className="delivery-form-container">
      <form onSubmit={handleSubmit(onSubmit)} method="post">
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
                {...register(name as keyof FormValues)}
                type={type ?? "text"}
                placeholder="Type here... "
              />
              {errors[name as keyof FormValues] && (
                <div className="validation-error">{errors[name as keyof FormValues]?.message}</div>
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
                {...register(name as keyof FormValues)}
                type={type ?? "text"}
                placeholder="Type here... "
              />
              {errors[name as keyof FormValues] && (
                <div className="validation-error">{errors[name as keyof FormValues]?.message}</div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {deliveryInfoInputs
            ?.slice(3, deliveryInfoInputs.length)
            ?.map(({ name, label, type }) => (
              <div key={name} className="input-item">
                <label htmlFor={name}>{label}</label>
                <input
                  autoComplete="true"
                  id={name}
                  {...register(name as keyof FormValues)}
                  type={type ?? "text"}
                  placeholder="Type here... "
                />
                {errors[name as keyof FormValues] && (
                  <div className="validation-error">{errors[name as keyof FormValues]?.message}</div>
                )}
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default CartDeliveryInfoForm;
