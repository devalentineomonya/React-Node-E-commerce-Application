"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProgressBarProvidersProps {
  children: React.ReactNode;
}

export const ProgressBarProviders: React.FC<ProgressBarProvidersProps> = ({
  children,
}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
