import footerLinks from "../../../assets/data/FooterData/FooterLinks";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./footer.css";
import FooterEnding from "./FooterEnding";
import FooterLinksList from "./FooterLinksList";
import FooterLogo from "./FooterLogo";
const Footer = () => {
  return (
    <MainLayout>
      <footer className="footer-container">
        <div className=" w-full lg:w-1/2">
          <FooterLogo />
        </div>
        <div className="footer-links-container">
          {footerLinks?.map((footerLink) => (
            <FooterLinksList
              title={footerLink.title}
              links={footerLink.links}
              key={footerLink.title}
            />
          ))}
        </div>
      </footer>
      <FooterEnding/>
    </MainLayout>
  );
};

export default Footer;
