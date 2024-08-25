import "./homehero.css";
import heroImage from "../../../assets/images/63e9b930e006824963189865_bg-stage.png";
import heroBackground from "../../../assets/images/63e8c4e58c0997219ec01eb6_background-bg-min.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import scrollReveal from "scrollreveal";
import { revealConfig } from "../../../../config/ScrollConfig";
import product1 from "../../../assets/images/63e8c4e660afc23a10a53523_other-min.png"
import product2 from "../../../assets/images/63e8c4e75b939fd1159c029e_tour-min.png"
import product3 from "../../../assets/images/63e9c0607f75e4aad54b94a0_ele.png"
import product4 from "../../../assets/images/63e8c4e7037f3b07ebcf202d_snaks-min.png"
const HomeHero = () => {
  useEffect(() => {
    setTimeout(() => {
      const srTitle = scrollReveal();
      const srDescription = scrollReveal();
      const srImage = scrollReveal();
      const srButton = scrollReveal();
      const srProducts = scrollReveal();

      srTitle.reveal(".home-hero-title-element", {
        ...revealConfig,
        origin: "left",
        delay: 50,
      });

      srDescription.reveal(".home-hero-description-element", {
        ...revealConfig,
        origin: "left",
        duration: 1200,
        delay: 75,
      });

      srImage.reveal(".hero-image", {
        ...revealConfig,
        origin: "right",
        duration: 1000,
        delay: 100,
      });

      srButton.reveal(".btn-learn-more", {
        ...revealConfig,
        origin: "bottom",
        duration: 1000,
        delay: 150,
      });
      srProducts.reveal(".common-image-styles",{
        ...revealConfig,
        origin:"top",
        duration: 1000,
        delay: 1000,
      })
    }, 200);
  }, []);

  return (
    <section
      className="home-hero-section"
      style={{ "--bg-img": `url(${heroBackground}` }}
    >
      <div className="home-hero-container">
        <div className="home-hero-content">
          <h2 className="home-hero-title-element">
            Shopping And Department Store
          </h2>
          <p className="home-hero-description-element">
            Welcome to Devalhopping Cart – where shopping meets delight! Explore
            our curated collection of products, find exclusive deals, and enjoy
            a seamless shopping experience.
            <Link className="underline" to="/shop">
              Start discovering now
            </Link>
          </p>
          <button
            title="Learn More"
            aria-label="Learn More"
            className="btn-learn-more"
          >
            <Link to="/about" title="Learn More" aria-label="Learn More">
              Learn More
            </Link>
          </button>
        </div>
        <div className="hero-image ">
          <img
            src={product1}
            alt="test-image-1"
            className="common-image-styles test-image-1 top-0 right-20 "
          />
          <img
            src={product2}
            alt="test-image-2"
            className="common-image-styles test-image-2 top-24 right-96 "
          />
          <img
            src={product3}
            alt="test-image-3"
            className="common-image-styles test-image-3 top-48 right-40 "
          />
          <img
            src={product4}
            alt="test-image-4"
            className="common-image-styles test-image-4 top-[14rem] right-[28rem] "
          />

          <img src={heroImage} alt="hero-image" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
