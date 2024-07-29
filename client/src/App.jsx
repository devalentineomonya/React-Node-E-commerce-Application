import { useRef } from "react";
import CustomAlert from "./components/common/CustomAlert/CustomAlert";
import NavbarMain from "./components/common/Navbar/NavbarMain";
import HomeHero from "./components/Home/HomeHero/HomeHero";
import useModal from "./hooks/useModal";

function App() {
  const {isShowing, toggle} = useModal();

  return (
    <>
      {/* <NavbarMain/> */}
      {/* <HomeHero/> */}
      <button className="button-default" onClick={toggle}>Show Modal</button>
      <CustomAlert
        isShowing={isShowing}
        hide={toggle}
      />
    </>
  );
}

export default App;
