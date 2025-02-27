"use client";
import { useState, useEffect } from "react";

interface BrowserWidthState {
  width: number;
  isMobile: boolean;
}

const useBrowserWidth = (): BrowserWidthState => {
  const [width, setWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
        setIsMobile(newWidth < 992);
      };

      // Initialize state
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { width, isMobile };
};

export default useBrowserWidth;
