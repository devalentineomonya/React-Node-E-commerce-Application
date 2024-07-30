import "./homehero.css"
import  heroBackground from "../../../assets/images/63e9b930e006824963189865_bg-stage.png"
const HomeHero = () => {
  return (
    <section className="home-hero-section" style={{"--bg-img":`url(${heroBackground}`}}>
      {/* <img src="" alt="" /> */}
      <div className="home-hero-container">

        <div className="home-hero-content">
          <h2>Shopping And Department Store</h2>
          <p>
            Duis aute in eiusmod laborum aliquip ipsum amet. Sunt reprehenderit
            proident veniam eiusmod id est.
          </p>
          <button>Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
