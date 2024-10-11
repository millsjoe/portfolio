import React from "react";
import {
  FaAws,
  FaReact,
  FaDocker,
  FaNode,
  FaPython,
  FaJenkins,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiTerraform,
  SiGrafana,
  SiStorybook,
} from "react-icons/si";

export const Footer = () => {
  return (
    <div className="flex flex-row scroll-footer h-auto gap-16">
      <FaAws />
      <FaReact />
      <FaDocker />
      <FaNode />
      <FaPython />
      <FaJenkins />
      <SiTypescript />
      <SiJavascript />
      <SiRedux />
      <SiTerraform />
      <SiStorybook />
      <SiGrafana />
    </div>
  );
};
