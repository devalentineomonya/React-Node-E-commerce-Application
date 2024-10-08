import SectionLayout from "../../layouts/SectionLayout/SectionLayout";
import OurServiceCard from "./OurServiceCard";
import testImage from  "../../../assets/images/63e8c4e6cd367817e964f756_sofa-min.png"
import "./ourservices.css";
const OurServices = () => {
    const service = {
        name:"Offer 001",
        description:"Culpa voluptate minim amet quis reprehenderit tempor duis enim excepteur commodo velit esse proident. ",
        image:testImage,
        value:70,
        
    }
  return (
    <SectionLayout title="Services to help you shop">
      <div className="services-card-container">
        <OurServiceCard service={service}/>
        <OurServiceCard service={service}/>
        <OurServiceCard />
        <OurServiceCard />
      </div>
    </SectionLayout>
  );
};

export default OurServices;
