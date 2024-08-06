import PropTypes from "prop-types"
const ProductOfferCard = ({ offer, bg, text }) => {
  return (
    <div className={`product-offers-card ${text}`}>
      <div className={`offer-info ${bg} `}>
        <p className="offer-save">Save</p>
        <h2 className="offer-value">
          <sup>$</sup>
          {offer?.value}
        </h2>
        <p className="offer-description">{offer?.description}</p>
      </div>
      <div className="offer-image">
        <img src={offer?.image} alt={offer?.name ?? "offer-image"} loading="lazy" />
      </div>
    </div>
  );
};

ProductOfferCard.propTypes = {
  offer: PropTypes.object,
  bg: PropTypes.string,
  text: PropTypes.string,
};
export default ProductOfferCard;
