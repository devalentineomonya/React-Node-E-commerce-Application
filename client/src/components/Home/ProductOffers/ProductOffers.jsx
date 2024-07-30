import SectionLayout from "../../common/SectionLayout/SectionLayout";
import "./productoffers.css";
import testImage from  "../../../assets/images/63e8c4e6cd367817e964f756_sofa-min.png"
import ProductOfferCard from "./ProductOfferCard";
const ProductOffers = () => {
    const offer = {
        name:"Offer 001",
        description:"Culpa voluptate minim amet quis reprehenderit tempor duis enim excepteur commodo velit esse proident. ",
        image:testImage,
        value:70,
        
    }
  return (
    <SectionLayout title="Get Up to 70% Off">
        <div className="offers-content">

      <ProductOfferCard bg="bg-[#f2e4d9]" text="text-[#cb9917]" offer={offer} />
      <ProductOfferCard />
      <ProductOfferCard />
      <ProductOfferCard />
        </div>
    </SectionLayout>
  );
};

export default ProductOffers;
