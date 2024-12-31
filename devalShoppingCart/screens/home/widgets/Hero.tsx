import Link from "next/link";
import MainLayout from "@/components/common/layouts/MainLayout";
import HeroItem from "../components/HeroItem";
import image from "@/public/images/banner-2.jpg";
import {
  PiTShirtThin,
  PiHouse,
  PiMonitorLight,
  PiArmchair,
  PiGiftThin,
  PiGameControllerLight,
  PiBowlFoodThin,
  PiDeviceMobileCamera,
  PiCameraLight,
} from "react-icons/pi";
import { BsHeartPulse } from "react-icons/bs";
import { IoDiamondOutline } from "react-icons/io5";

const Hero = () => {
  const categories = [
    { name: "Fashion", icon: PiTShirtThin },
    { name: "Home & Garden", icon: PiHouse },
    { name: "Electronics", icon: PiMonitorLight },
    { name: "Furniture", icon: PiArmchair },
    { name: "Health & Beauty", icon: BsHeartPulse },
    { name: "Gift Ideas", icon: PiGiftThin },
    { name: "Toys & Games", icon: PiGameControllerLight },
    { name: "Cooking", icon: PiBowlFoodThin },
    { name: "Smart Phones", icon: PiDeviceMobileCamera },
    { name: "Cameras & Photo", icon: PiCameraLight },
    { name: "Accessories", icon: IoDiamondOutline },
    { name: "View All Categories", icon: null },
  ];

  return (
    <MainLayout className="mt-4">
      <div className="grid grid-cols-12 aspect-video w-full max-h-[540px] gap-x-6">
        {/* Sidebar */}
        <div className="max-lg:hidden lg:col-span-3 px-3 py-2 bg-gray-50 rounded-sm">
          <ul>
            {categories.map((item, index, array) => (
              <li
                className={`p-2.5 my-0.5 text-sm hover:pl-4 transition-all ease-in-out duration-300 hover:text-primary ${
                  index !== array.length - 1
                    ? "border-b"
                    : "font-bold text-xl text-gray-700"
                }`}
                key={index}
              >
                <Link
                  href="/"
                  className="hover:text-primary w-full h-full  truncate flex items-center gap-x-2"
                >
                  {item.icon && <item.icon size={18}/>}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Hero */}
        <div className="col-span-12 lg:col-span-9 rounded-sm overflow-hidden">
          <HeroItem
            name="Samsung Galaxy"
            image={image}
            offer="30% OFF"
            description="Smart Phones"
            category="Smart Phones"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Hero;
