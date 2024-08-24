import { useSelector } from "react-redux";
import "./moreaboutproduct.css";
import MoreInfoCard from "./MoreInfoCard";
const MoreAboutProduct = () => {
  const productInfo = useSelector((state) => state.product.currentProduct);
  const keys = Object.keys(productInfo?.additionalInfo || {});
  const values = Object.values(productInfo?.additionalInfo || {});
  return (
    <div className="more-about-product">
      <h5>{productInfo?.name} Full Specifications</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-2">
        <MoreInfoCard
          title="General"
          label1="name"
          value1={productInfo?.name}
          label2="Brand"
          value2={productInfo?.brand}
          label3="Category"
          value3={productInfo?.category}
          label4="Type"
          value4={productInfo?.type}
          label5="Short Description"
          value5={productInfo?.shortDescription}
        />
        <MoreInfoCard
          title="Product Details"
          label1="Rating"
          value1={productInfo?.rating}
          label2="Reviews"
          value2={productInfo?.reviewCount}
          label3="Label"
          value3={productInfo.label}
          label4="Available Colors"
          value4={productInfo?.colorVariants?.length}
          label5="Stock"
          value5={productInfo?.stock}
        />

        <MoreInfoCard
          title="Additional Information"
          label1={keys[0] || ""}
          value1={values[0] || ""}
          label2={keys[1] || ""}
          value2={values[1] || ""}
          label3={keys[2] || ""}
          value3={values[2] || ""}
          label4={keys[3] || ""}
          value4={values[3] || ""}
          label5={keys[4] || ""}
          value5={values[4] || ""}
        />
      </div>
    </div>
  );
};

export default MoreAboutProduct;
