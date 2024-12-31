import footerPaymentMethod from "./footerpaymentmethods";
import Logo from "@/public/images/logo.svg";
import Image from "next/image";
function FooterLogo() {
  return (
    <div className="footer-logo-container">
      <Image className="mb-8" src={Logo} alt="logo-image" loading="lazy" />
      <p className="text-[14px] font-semibold text-gray-500 mb-8">
        Welcome to our company! We are dedicated to providing you with the best
        products and services. Our commitment to quality and customer
        satisfaction drives everything we do. Thank you for choosing us as your
        trusted partner.
      </p>
      <div className="w-full">
        <h3 className="mb-3 font-semibold text-slate-700 text-[18px]">Accepted Payments</h3>
        <div className="grid grid-cols-4 gap-y-3  justify-center items-center max-w-full sm:max-w-[350px] mt-2">
          {footerPaymentMethod?.map((method) => (
            <Image
            className="rounded-md border border-gray-300 py-3 px-5 max-w-[80px] max-h-[48px] min-w-[80px] min-h-[48px] hover:bg-gray-100 cursor-pointer"
              src={method.image}
              alt={method.name ?? "payment-method-image"}
              key={method.name}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterLogo;
