import stripe from "@/public/images/63eb1ce8816711ebecac46d8_stripe.png";
import visa from "@/public/images/63eb1ce82d440b7ab84a993f_visa.png";
import masterCard from "@/public/images/63eb1ce8f032504012a5896b_Mastercard.png";
import AmazonPay from "@/public/images/63e8c4e48b497e6ce846b7ff_Amazon.png"
import klarna from "@/public/images/63eb1f054e419e42aca4a9a2_Klarna.png"
import paypal from "@/public/images/63eb1ce7c4510cf9a55828a0_PayPal.png"
import applePay from "@/public/images/63e8c4e4707380264b25e680_ApplePay.png"
import googlePay from "@/public/images/63eb1f55dc68c5ee83d0cbf8_GooglePay.png"
const footerPaymentMethod = [
  {
    name: "Stripe",
    image: stripe,
  },
  {
    name: "Visa",
    image: visa,
  },
  {
    name: "MasterCard",
    image: masterCard,
  },
  {
    name:"AmazonPay",
    image:AmazonPay,
  },
  {
    name:"Klarna",
    image:klarna,
  },
  {
    name:"Paypal",
    image:paypal,
  },
  {
    name:"ApplePay",
    image:applePay
  },
  {
    name:"GooglePay",
    image:googlePay
  }
];
export default footerPaymentMethod
