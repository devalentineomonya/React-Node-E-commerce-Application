import Link from "next/link";
import MainLayout from "@/components/common/layouts/MainLayout";
import HeroItem from "../components/HeroItem";

const Hero = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-12 h-[540px] gap-x-6 ">
        <div className=" col-span-3 px-3 py-2 bg-gray-50 rounded-sm">
          <ul>
            {[
              "Fashion",
              "Home & Garden",
              "Electronics",
              "Furniture",
              "Health & Beauty",
              "Gift Ideas",
              "Toys & Games",
              "Cooking",
              "Smart Phones",
              "Cameras & Photo",
              "Accessories",
              "View All Categories",
            ].map((item, index, array) => (
              <li
                className={`p-2.5 my-0.5  text-sm hover:pl-4 text-primary  ${
                  index !== array.length - 1
                    ? "border-b"
                    : "font-bold text-xl text-gray-700"
                }`}
                key={index}
              >
                <Link href="/" className="hover:text-primary">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-green-500 col-span-9">
            <HeroItem name="Samsung Galaxy" image="/images/banner-1.png" offer="30% OFF" description={"Smart Phones"} category={"Smart Phones"} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Hero;
