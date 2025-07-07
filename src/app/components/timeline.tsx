"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import {
  FaAws,
  FaBriefcase,
  FaDocker,
  FaJava,
  FaJenkins,
  FaNode,
  FaPython,
  FaReact,
  FaSchool,
} from "react-icons/fa";
import {
  SiPlaywright,
  SiRedux,
  SiStorybook,
  SiTypescript,
  SiJavascript,
  SiTerraform,
  SiSplunk,
  SiNewrelic,
  SiPerl,
  SiKotlin,
} from "react-icons/si";
import { FaC } from "react-icons/fa6";

export const Timeline = () => {
  return (
    <div>
      <VerticalTimeline lineColor="#0d3b66">
        <TimelineElement
          title="Senior Software Engineer"
          location="Flutter UKI"
          date="2023 - Present"
          description="Spending my days mentoring other engineers. Continuing working on the SBG Games launch service and reality check service with the added bonus of migration of SBG -> Paddy Power Betfair. 
          Migration includes implementing a new design system in Storybook. Along with a new automation test framework using Playwright and Typescript."
          type="work"
          icons={[
            <SiTypescript key="ts" />,
            <SiJavascript key="js" />,
            <FaReact key="react" />,
            <FaDocker key="docker" />,
          ]}
        />
        <TimelineElement
          title="MSc Digital & Technology Solutions"
          location="Sheffield Hallam University"
          date="2021 - 2023"
          description="First class (alongside my SBG employment). I wrote my dissertation on improving the performance and scalability of the Games Launch Service."
          type="education"
          icons={[
            <SiTypescript key="ts" />,
            <FaNode key="node" />,
            <FaAws key="aws" />,
            <FaDocker key="docker" />,
          ]}
        />
        <TimelineElement
          title="Software Engineer"
          location="Flutter UKI"
          date="2021 - 2023"
          description="Working and improving on the SBG Games launch service and reality check service. 
          The Games launch service see's a whopping 10 million requests a week! 
          And my improvements to the reality check service enabled it to handle 8000 requests per second! Take that load test!"
          type="work"
          icons={[
            <FaReact key="react" />,
            <FaAws key="aws" />,
            <SiTypescript key="ts" />,
            <FaDocker key="docker" />,
          ]}
        />
        <TimelineElement
          title="Software Engineer Intern"
          location="Hewlett Packard Enterprise"
          date="2018 - 2020"
          description="I started my career as a test automation engineer. 
          I was responsible for maintaining the Accelerated Life Test framework which simulates the life of large storage backups in an instant. 
          During this time I implemented a new adaption of the framework moving from Perl to Python"
          type="work"
          icons={[
            <FaPython key="python" />,
            <FaDocker key="docker" />,
            <FaJenkins key="jenkins" />,
          ]}
        />
        <TimelineElement
          title="BSc Computer Science"
          location="University of Leeds"
          date="2016 - 2020"
          description="First Class Honours. I wrote my dissertation the performance and scalability of modelling bacterial colonies and tumours."
          type="education"
          icons={[
            <FaC key="c" />,
            <FaJava key="java" />,
            <FaPython key="python" />,
          ]}
        />
      </VerticalTimeline>
    </div>
  );
};

interface TimelineElementProps {
  title: string;
  location: string;
  date: string;
  description: string;
  type: "work" | "education";
  icons?: React.ReactNode[];
}

const TimelineElement = ({
  title,
  location,
  date,
  description,
  type,
  icons,
}: TimelineElementProps) => {
  const typeIcon = type === "work" ? <FaBriefcase /> : <FaSchool />;
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element"
      contentStyle={{ background: "#ffffff", color: "#0d3b66" }}
      contentArrowStyle={{ borderRight: "7px solid #0d3b66" }}
      date={date}
      dateClassName="text-gray-400"
      iconStyle={{ background: "#D92231", color: "#fff" }}
      icon={typeIcon}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3>
      <h4 className="vertical-timeline-element-subtitle">{location}</h4>
      <p>{description}</p>
      {icons && <div className="flex flex-wrap gap-2 mt-2">{icons}</div>}
    </VerticalTimelineElement>
  );
};
