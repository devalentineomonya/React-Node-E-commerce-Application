import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const HomeHero = () => {
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
              <li className={`p-2.5 my-0.5  text-sm hover:pl-4 text-primary  ${index !== array.length - 1 ? "border-b" : "font-bold text-xl text-gray-700"}`} key={index}>
                <Link
                    to="/"
                    className="hover:text-primary"
                  >
                {item}
                </Link>
                </li>
            ))}
          </ul>
        </div>
        <div className="bg-green-500 col-span-9"></div>
      </div>
    </MainLayout>
  );
};

export default HomeHero;
