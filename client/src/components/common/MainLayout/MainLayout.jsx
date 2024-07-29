import PropTypes from "prop-types";
import "./mainlayout.css";

const MainLayout = ({ children, bg = "bg-white" }) => {
  return (
    <main className={`main-layout ${bg}`}>
      <div className="main-container">{children}</div>
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  bg: PropTypes.string,
};

export default MainLayout;
