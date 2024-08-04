import footerPaymentMethod from "../../../assets/data/FooterData/FooterPaymentMenthods";
import Logo from "../../../assets/images/logo.svg";
function FooterLogo() {
  return (
    <div className="footer-logo-container">
      <img src={Logo} alt="" />
      <p>
        Ex laborum occaecat dolor occaecat ullamco dolore id ullamco irure qui
        deserunt ullamco adipisicing. Exercitation tempor est aute sit.
        Exercitation tempor est aute sit.
      </p>
      <div className="footer-payment">
        <h3>Accepted Payments</h3>
        <div className="payment-methods">
          {footerPaymentMethod?.map((method) => (
            <img src={method.image} alt={method.name} key={method.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterLogo;
