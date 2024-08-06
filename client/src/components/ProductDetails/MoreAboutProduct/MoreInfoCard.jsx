const MoreInfoCard = () => {
  return (
    <div className="more-info-card">
      <h6>General</h6>
      <div className="info-items">
        <div className="info-item bg-white">
          <p className="info-label">Brand</p>
          <p className="info-value">Apple</p>
        </div>
        <div className="info-item bg-gray-200">
          <p className="info-label">Model</p>
          <p className="info-value">Apple ProMax</p>
        </div>
        <div className="info-item bg-white">
          <p className="info-label">Price</p>
          <p className="info-value">$450</p>
        </div>
        <div className="info-item bg-gray-200">
          <p className="info-label">Release Date</p>
          <p className="info-value">Fri 12 Aug 2023</p>
        </div>
        <div className="info-item bg-white">
          <p className="info-label">Connection</p>
          <p className="info-value">Bluetooth</p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoCard;
