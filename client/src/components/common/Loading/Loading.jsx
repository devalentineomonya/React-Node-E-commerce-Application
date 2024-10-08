import { FaSpinner } from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const Loading = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-[60vh]">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        <span className="ml-4 text-lg text-gray-700">Loading...</span>
      </div>
    </MainLayout>
  );
};

export default Loading;
