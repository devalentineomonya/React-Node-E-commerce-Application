import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from "prop-types"


const BrowserWidthContext = createContext(undefined);


const useBrowserWidth = () => {
  const context = useContext(BrowserWidthContext);
  if (!context) {
    throw new Error('useBrowserWidth must be used within a BrowserWidthProvider');
  }
  return context;
};




const BrowserWidthProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserWidthContext.Provider value={{ width }}>
      {children}
    </BrowserWidthContext.Provider>
  );
};

BrowserWidthProvider.propTypes = {
  children:PropTypes.node.isRequired
}
export { BrowserWidthProvider, useBrowserWidth };
