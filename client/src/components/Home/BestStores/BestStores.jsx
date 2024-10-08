import SectionLayout from "../../layouts/SectionLayout/SectionLayout"
import BestStoreCard from "./BestStoreCard"
import "./beststore.css"

const BestStores = () => {
  return (
  <SectionLayout title="Best Selling Stores">
    <div className="best-store-cards">

    <BestStoreCard/>
    <BestStoreCard/>
    <BestStoreCard/>
    <BestStoreCard/>
    </div>

  </SectionLayout>
  )
}

export default BestStores
