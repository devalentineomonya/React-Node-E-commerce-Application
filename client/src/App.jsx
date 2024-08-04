import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/home/Home";

function App() {
  console.log(document)
  return (
    <>
      <NavbarMain />
      <Home />
      <Footer/>
    </>
  );
}

export default App;
