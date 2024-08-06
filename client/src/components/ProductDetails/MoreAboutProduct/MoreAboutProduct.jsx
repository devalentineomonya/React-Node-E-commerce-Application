import "./moreaboutproduct.css"
import MoreInfoCard from "./MoreInfoCard"
const MoreAboutProduct = () => {
  return (
    <div className="more-about-product">
     <h5>Apple AirPods Max Wireless Headphones Full Specifications</h5>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-2">
     <MoreInfoCard/>
     <MoreInfoCard/>
     <MoreInfoCard/>
     </div>
    </div>
  )
}

export default MoreAboutProduct
