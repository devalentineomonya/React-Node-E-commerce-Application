import PropTypes from 'prop-types';

const MoreInfoCard = ({ title, label1, value1, label2, value2, label3, value3, label4, value4, label5, value5 }) => {
  return (
    <div className="more-info-card">
      <h6>{title}</h6>
      <div className="info-items">
        <div className="info-item bg-white">
          <p className="info-label">{label1}</p>
          <p className="info-value">{value1}</p>
        </div>
        <div className="info-item bg-gray-200">
          <p className="info-label">{label2}</p>
          <p className="info-value">{value2}</p>
        </div>
        <div className="info-item bg-white">
          <p className="info-label">{label3}</p>
          <p className="info-value">{value3}</p>
        </div>
        <div className="info-item bg-gray-200">
          <p className="info-label">{label4}</p>
          <p className="info-value">{value4}</p>
        </div>
        <div className="info-item bg-white">
          <p className="info-label">{label5}</p>
          <p className="info-value">{value5}</p>
        </div>
      </div>
    </div>
  );
};

MoreInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  label1: PropTypes.string.isRequired,
  value1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  value2: PropTypes.string.isRequired,
  label3: PropTypes.string.isRequired,
  value3: PropTypes.string.isRequired,
  label4: PropTypes.string.isRequired,
  value4: PropTypes.string.isRequired,
  label5: PropTypes.string.isRequired,
  value5: PropTypes.string.isRequired,
};

export default MoreInfoCard;
