import { BiChevronRight } from "react-icons/bi";

const BreadCrumb = () => {
  return (
    <div className="flex justify-start items-center text-[10px] font-semibold mb-5 pt-5 border-t-2 border-gray-200 text-gray-500 ">
      <span>Elecronics</span>
      <BiChevronRight size={20}/>
      <span>Audio</span>
      <BiChevronRight size={20}/>
      <span>HeadSet</span>
      <BiChevronRight size={20}/>
      <span>Shop By Type</span>
      <BiChevronRight size={20}/>
      <span className="text-gray-900">AirPods Max</span>
    </div>
  );
};

export default BreadCrumb;
