import footerLinks from "../../../assets/data/FooterData/FooterLinks";
import MainLayout from "../../common/MainLayout/MainLayout";
import "./footer.css";
import FooterEnding from "./FooterEnding";
import FooterLinksList from "./FooterLinksList";
import FooterLogo from "./FooterLogo";
const Footer = () => {
  return (
    <MainLayout>
      <div className="footer-container">
        <div className="w-[45%]">
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
      </div>
      <FooterEnding/>
    </MainLayout>
  );
};

export default Footer;
