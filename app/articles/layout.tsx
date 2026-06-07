import { Navbar } from "@/components/home/header/navbar";
import React from "react";

const ArticlesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ArticlesLayout;
