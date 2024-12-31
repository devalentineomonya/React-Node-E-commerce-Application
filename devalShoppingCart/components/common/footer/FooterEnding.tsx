import Link from "next/link";
import Image from "next/image";
import footerEnding from "./footerending";

const FooterEnding = () => {
  return (
    <div className="flex justify-between items-center flex-col gap-y-12 md:flex-row font-semibold text-gray-500 pt-2 pb-8">
      <div className="flex gap-x-8">
        {footerEnding?.map((footerEndingItem) => (
          <div className="flex gap-x-2" key={footerEndingItem.name}>
            <Image
              src={footerEndingItem.image}
              alt={footerEndingItem.name ?? "footer-ending-image"}
              loading="lazy"
            />
            {footerEndingItem.name}
          </div>
        ))}
      </div>
      <div className="flex items-start gap-x-4">
        <Link href="/" title="Terms Of Services" aria-label="Terms Of Services">
          Term of Services
        </Link>
        <Link
          href="/"
          title="Privacy and Policy"
          aria-label="Privacy and Policy"
        >
          Privacy and Policy
        </Link>
      </div>
      <div>
        All Rights Reserved from
        <Link
          href="https://devalentineomonya.vercel.app"
          target="_blank"
          className="text-green-600 underline mx-3"
          title="My Portfolio"
          aria-label="My Portfolio"
        >
          Devalentine
        </Link>
        | {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default FooterEnding;
