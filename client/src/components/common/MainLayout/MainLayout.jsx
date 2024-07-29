import "./mainlayout.css";
const MainLayout = ({ children, bg="bg-white" }) => {
  return (
    <main className={`main-layout ${bg}`}>
      <div className="main-container">{children}</div>
    </main>
  );
};

export default MainLayout;
