import { useSelector } from "react-redux";

const ProductImages = () => {
  const productImages = useSelector(
    (state) => state.product.currentProduct?.images || []
  );

  if (!productImages?.length) {
    return <p>No images available</p>; 
  }

  return (
    <div className="product-images">
      <div className="product-image-main">
        <img
          src={productImages[0]?.url}
          alt={productImages[0]?.altText || 'Main product image'}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </div>

     
      <div className="product-image-small flex gap-2 mt-4">
        {productImages?.slice(1, 5)?.map((image, index) => (
          <img
            key={index}
            src={image?.url || productImages[0]?.url}
            alt={image?.altText || productImages[0]?.altText || `Product image ${index + 1}`}
            loading="lazy"
            className="w-24 h-24 object-cover"
          />
          
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
