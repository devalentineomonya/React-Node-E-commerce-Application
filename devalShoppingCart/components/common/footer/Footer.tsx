import footerLinks from "./footerlinks";
import MainLayout from "../layouts/MainLayout";
import FooterEnding from "./FooterEnding";
import FooterLinksList from "./FooterLinksList";
import FooterLogo from "./FooterLogo";
const Footer = () => {
  return (
    <MainLayout>
      <footer className="flex lg:flex-row flex-col gap-y-12 mt-16 mb-7 border-y-2 py-12 border-gray-300 gap-x-16  overflow-x-hidden">
        <div className=" w-full lg:w-1/2">
          <FooterLogo />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10  justify-between w-full items-start gap-x-3">
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
