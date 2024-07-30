import MainLayout from "../MainLayout/MainLayout";
import PropTypes from "prop-types"
import "./sectionlayout.css"

const SectionLayout = ({children}) => {
  return (
    <MainLayout>
      <section className="section-container">
        <div className="section-title">Todays Best Deals for you!</div>
        <div className="section-content">{children}</div>
      </section>
    </MainLayout>
  );
};

SectionLayout.propTypes = {
    children: PropTypes.node
}
export default SectionLayout;
