import React from "react";
import "./mainlayout.css";
const MainLayout = ({ children, bg="bg-white" }) => {
    console.log(`bg-${bg}`)
  return (
    <main className={`main-layout ${bg}`}>
      <div className="main-container">{children}</div>
    </main>
  );
};

export default MainLayout;
