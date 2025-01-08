import React from "react";
import logo from "@/public/images/logo_big.png";
import Image from "next/image";
import AnimatedIcons from "./AnimatedIcons";
import { Meteors } from "@/components/ui/meteors";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,

  title,
  description,
}) => {
  return (
    <main className=" h-[calc(100vh-2.5rem)]">
      <div className="h-full w-full rounded-md  grid grid-cols-12 justify-between ">
        <section className="w-full col-span-4 hidden lg:flex items-center justify-center h-full overflow-hidden relative bg-[#f7fbff]">
          <div className="absolute w-full h-full">
            <Meteors number={60} />
          </div>
          <AnimatedIcons />
        </section>
        <section className="col-span-12 lg:col-span-8 h-full px-4 flex justify-center items-center bg-[#fffffa] flex-col">
          <div className="flex flex-col justify-center items-center  max-w-96 ">
            <Image src={logo} alt="Logo" />
            <h2 className="text-center font-semibold text-3xl mt-3 text-gray-600">
              {title}
            </h2>
            <p className="text-center font-medium text-gray-500 mt-3 text-sm">
              {description}
            </p>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
