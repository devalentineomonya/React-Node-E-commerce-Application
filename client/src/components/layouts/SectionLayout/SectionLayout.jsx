import MainLayout from "../MainLayout/MainLayout";
import PropTypes from "prop-types";
import "./sectionlayout.css";
import scrollReveal from "scrollreveal";
import { useEffect } from "react";
import { revealConfig } from "../../../../config/ScrollConfig";

const SectionLayout = ({ children, title, overflow = false }) => {
  useEffect(() => {
    const sr = scrollReveal();
  
    sr.reveal(".section-title", {
      ...revealConfig,
      duration: 1000,
      distance: "50px",
      origin: "bottom",

    });
  
    sr.reveal(".section-content", {
      ...revealConfig,
      duration: 1000,
      distance: "50px",
      origin: "bottom",
      delay: 200,
    });
  }, []);
  
  return (
    <MainLayout overflow={overflow}>
      <section className="section-container">
        <div className="section-title">{title}</div>
        <div className="section-content">{children}</div>
      </section>
    </MainLayout>
  );
};

SectionLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  overflow: PropTypes.bool,
};
export default SectionLayout;
