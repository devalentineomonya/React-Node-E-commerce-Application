import React from "react";
import logo from "@/public/images/logo_big.png";
import Image, { StaticImageData } from "next/image";
import MainLayout from "@/components/common/layouts/MainLayout";

interface AuthLayoutProps {
  children: React.ReactNode;
  image: string | StaticImageData;
  title: string;
  description: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  image,
  title,
  description,
}) => {
  return (
    <MainLayout className="overflow-visible">
      <div className=" h-screen">
        <div className="h-full w-full rounded-md  flex justify-between ">
          <div className=" flex-1 w-1/2 h-full overflow-hidden hidden lg:block">
            <Image className="w-full h-full" src={image} loading="lazy" alt={title} />
          </div>
          <div className="w-full lg:w-1/2 flex-1 h-full px-4 flex justify-center items-center bg-[#fffffa] flex-col">
            <div className="flex flex-col justify-center items-center  max-w-96 ">
              <Image src={logo} alt="Logo" />
              <h2 className="text-center font-semibold text-3xl mt-3 text-gray-600">{title}</h2>
              <p className="text-center font-medium text-gray-500 mt-3 text-sm">{description}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthLayout;
