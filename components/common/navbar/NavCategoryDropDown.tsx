import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavCategoryDropDownProps {
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryItemProps {
  image: string;
  name: string;
  count: number;
  brand?: boolean;
  animate?: boolean;
}

const NavCategoryDropDown: React.FC<NavCategoryDropDownProps> = ({
  showDropDown,
  setShowDropDown,
}) => {
  // Categories data
  const categories = [
    {
      _id: "1",
      name: "Electronics",
      imageUrl: "https://via.placeholder.com/150?text=Electronics", // Example image URL
    },
    {
      _id: "2",
      name: "Clothing",
      imageUrl: "https://via.placeholder.com/150?text=Clothing",
    },
    {
      _id: "3",
      name: "Home Appliances",
      imageUrl: "https://via.placeholder.com/150?text=Home+Appliances",
    },
    {
      _id: "4",
      name: "Books",
      imageUrl: "https://via.placeholder.com/150?text=Books",
    },
  ];

  // Products data
  const products = [
    {
      _id: "p1",
      name: "Smartphone",
      category: "Electronics",
      price: 499,
      imageUrl: "https://via.placeholder.com/150?text=Smartphone", // Example image URL
    },
    {
      _id: "p2",
      name: "Laptop",
      category: "Electronics",
      price: 899,
      imageUrl: "https://via.placeholder.com/150?text=Laptop",
    },
    {
      _id: "p3",
      name: "T-shirt",
      category: "Clothing",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150?text=T-shirt",
    },
    {
      _id: "p4",
      name: "Washing Machine",
      category: "Home Appliances",
      price: 350,
      imageUrl: "https://via.placeholder.com/150?text=Washing+Machine",
    },
    {
      _id: "p5",
      name: "Refrigerator",
      category: "Home Appliances",
      price: 650,
      imageUrl: "https://via.placeholder.com/150?text=Refrigerator",
    },
    {
      _id: "p6",
      name: "Novel",
      category: "Books",
      price: 9.99,
      imageUrl: "https://via.placeholder.com/150?text=Novel",
    },
  ];

  const dropdownVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative flex">
      <div
        className="text-gray-600 max-xl:text-xl relative whitespace-nowrap flex justify-center items-center gap-x-1 cursor-pointer"
        onClick={() => setShowDropDown((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setShowDropDown((prev) => !prev);
          }
        }}
        tabIndex={0}
      >
        Categories
        <BsChevronDown
          className={cn("transition-all ease-in-out duration-300", {
            "rotate-180": showDropDown,
          })}
        />
      </div>

      {/* Conditionally render dropdown */}
      {showDropDown && (
        <motion.div
          className={cn(
            "absolute bg-white min-w-[800px] w-full mt-12 p-4 rounded-md left-0 shadow-[3px_3px_16.5px_-7.5px_#ccc6c6] z-30"
          )}
          initial="closed"
          animate="open"
          exit="closed"
          variants={dropdownVariants}
        >
          <div className="text-gray-800 font-bold text-xl pb-3 mb-2 border-b-2 border-gray-300">
            Popular Categories
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories?.map((category) => {
              const productInCategory = products?.filter(
                (product) => product?.category === category?.name
              );
              return (
                <CategoryItem
                  key={category?._id}
                  image={category?.imageUrl}
                  name={category?.name}
                  count={productInCategory.length}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  image,
  name,
  count,
  brand = false,
  animate = false,
}) => {
  console.log(animate);
  return (
    <Link
      href={`/shop?${brand ? "brand" : "category"}=${name.toLowerCase()}`}
      title="Shop Category"
      aria-label="Shop Category"
    >
      <div
        className={`w-full rounded-md bg-gray-100 min-h-16 flex gap-x-2 p-2 pl-3 justify-start items-center max-w-[350px] ${
          brand ? "brand-animation-class" : ""
        } ${brand ? "hover:border border-primary" : ""}`}
      >
        <div
          className={`bg-white rounded-md max-h-20 max-w-20 overflow-hidden ${
            brand ? "bg-transparent" : ""
          }`}
        >
          <Image
            src={image}
            alt={name ?? "category/brand-image"}
            className={brand ? "rounded-full" : ""}
            loading="lazy"
            quality={100}
            width={100}
            height={100}
          />
        </div>
        <div className="category-card-text">
          <h6 className="text-base font-semibold hover:text-blue-700">
            {name}
          </h6>
          <p className="text-sm">{count} Items Available</p>
        </div>
      </div>
    </Link>
  );
};

export default NavCategoryDropDown;
