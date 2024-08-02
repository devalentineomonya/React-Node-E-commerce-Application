import  heroBackground from "../../../assets/images/63e9b930e006824963189865_bg-stage.png"
import "./cashbackbanner.css"

const CashBackBanner = () => {
  return (
    <section className="home-cashback-banner-section">
      <div className="banner-image" style={{"--banner-image":`url("${heroBackground}")`}}>
      <div className="banner-text-container">
        <h2>Get 5% Cash back on $200</h2>
        <p>Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
        <button>Learn More</button>
      </div>
      </div>
    </section>
  );
};

export default CashBackBanner;
