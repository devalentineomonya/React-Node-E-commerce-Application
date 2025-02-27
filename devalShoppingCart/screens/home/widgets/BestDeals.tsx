import SectionLayout from "@/components/common/layouts/section/SectionLayout";
import ProductCard from "@/components/shared/ProductCard/ProductCard";

const BestDeals = () => {
  return (
    <SectionLayout title="Todays Best Deals for you!">
      <>
        <div className="flex justify-start items-center gap-x-4 mb-5">
          <button
            className="px-12 py-2 border-2 border-slate-800 text-slate-800 hover:bg-primary hover:text-white rounded-full max-w-28"
            title="All Filters"
            aria-label="All Filters"
          >
            All
          </button>
        </div>
        <div className=" grid sm:justify-center grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-12">
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCard key={i} product={{ id: i, name: `Product ${i + 1}`, price: 100 + i * 10, image: `product-${i + 1}.jpg`, shortDescription: `Description of Product ${i + 1}` }} />
          ))}
        </div>
      </>
    </SectionLayout>
  );
};

export default BestDeals;
