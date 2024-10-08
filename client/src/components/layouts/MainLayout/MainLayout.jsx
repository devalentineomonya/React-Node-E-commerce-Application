import PropTypes from "prop-types";
import "./mainlayout.css";

const MainLayout = ({
  children,
  bg = "bg-white",
  mt = "",
  overflow = false,
}) => {
  return (
    <main
      className={`main-layout ${bg} ${mt} ${
        !overflow ? "overflow-hidden" : ""
      }`}
    >
      <div className="main-container">{children}</div>
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  bg: PropTypes.string,
  mt: PropTypes.string,
  overflow: PropTypes.bool,
};

export default MainLayout;
