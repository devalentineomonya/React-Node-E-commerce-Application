import PropTypes from "prop-types";
import "./mainlayout.css";

const MainLayout = ({ children, bg = "bg-white", mt }) => {
  return (
    <main className={`main-layout ${bg} ${mt && mt}`}>
      <div className="main-container">{children}</div>
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  bg: PropTypes.string,
  mt:PropTypes.string
};

export default MainLayout;
