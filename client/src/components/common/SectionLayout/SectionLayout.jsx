import MainLayout from "../MainLayout/MainLayout";
import PropTypes from "prop-types"
import "./sectionlayout.css"

const SectionLayout = ({children, title,overflow=false}) => {
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
    title:PropTypes.string,
    overflow:PropTypes.bool
}
export default SectionLayout;
