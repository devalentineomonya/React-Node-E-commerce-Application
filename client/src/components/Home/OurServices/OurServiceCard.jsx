import PropTypes from "prop-types";
const OurServiceCard = ({ service }) => {
  return (
    <div className="product-offers-card service-card">
      <div className="service-description">
        <h4>Frequently Asked Questions</h4>
        <p>
          Velit velit officia magna veniam sit veniam consectetur tempor elit.
          Do excepteur aliquip quis culpa ullamco.{" "}
        </p>{" "}
      </div>
      <div className="service-image">
        <img src={service?.image} alt={service?.name} loading="lazy" />
      </div>
    </div>
  );
};

OurServiceCard.propTypes = {
  service: PropTypes.object,
};

export default OurServiceCard;
