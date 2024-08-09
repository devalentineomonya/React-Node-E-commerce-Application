import NavbarTop from './NavbarTop'
import "./navbar.css"
import NavbarLower from './NavbarLower'
import { useLayoutEffect, useRef } from 'react'
const NavbarMain = () => {
  const navbarHeader = useRef()

  useLayoutEffect(() => {
    if ( navbarHeader.current) {
      const textBoxDimensions = navbarHeader.current.getBoundingClientRect();
      console.log(textBoxDimensions.height);
    }
  }, []);
  return (
    <header ref={navbarHeader}>
    <NavbarTop/>
    <NavbarLower/>
    </header>
  )
}

export default NavbarMain
