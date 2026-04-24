"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

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
import type { TimelineEntry } from "../../lib/contentful";

const defaultEntries: TimelineEntry[] = [
  {
    title: "Senior Software Engineer",
    location: "Flutter UKI",
    date: "2023 - Present",
    description:
      "Spending my days mentoring other engineers. Continuing working on the SBG Games launch service and reality check service with the added bonus of migration of SBG -> Paddy Power Betfair. Migration includes implementing a new design system in Storybook. Along with a new automation test framework using Playwright and Typescript.",
    type: "work",
    skills: ["typescript", "javascript", "react", "docker"],
  },
  {
    title: "MSc Digital & Technology Solutions",
    location: "Sheffield Hallam University",
    date: "2021 - 2023",
    description:
      "First class (alongside my SBG employment). I wrote my dissertation on improving the performance and scalability of the Games Launch Service.",
    type: "education",
    skills: ["typescript", "node", "aws", "docker"],
  },
  {
    title: "Software Engineer",
    location: "Flutter UKI",
    date: "2021 - 2023",
    description:
      "Working and improving on the SBG Games launch service and reality check service. The Games launch service see's a whopping 10 million requests a week! And my improvements to the reality check service enabled it to handle 8000 requests per second! Take that load test!",
    type: "work",
    skills: ["react", "aws", "typescript", "docker"],
  },
  {
    title: "Software Engineer Intern",
    location: "Hewlett Packard Enterprise",
    date: "2018 - 2020",
    description:
      "I started my career as a test automation engineer. I was responsible for maintaining the Accelerated Life Test framework which simulates the life of large storage backups in an instant. During this time I implemented a new adaption of the framework moving from Perl to Python",
    type: "work",
    skills: ["python", "docker", "jenkins", "perl"],
  },
  {
    title: "BSc Computer Science",
    location: "University of Leeds",
    date: "2016 - 2020",
    description:
      "First Class Honours. I wrote my dissertation the performance and scalability of modelling bacterial colonies and tumours.",
    type: "education",
    skills: ["c", "java", "python"],
  },
];

const skillIcon: Record<string, React.ReactNode> = {
  typescript: <SiTypescript />,
  javascript: <SiJavascript />,
  react: <FaReact />,
  docker: <FaDocker />,
  node: <FaNode />,
  aws: <FaAws />,
  python: <FaPython />,
  jenkins: <FaJenkins />,
  java: <FaJava />,
  c: <FaC />,
  redux: <SiRedux />,
  storybook: <SiStorybook />,
  terraform: <SiTerraform />,
  splunk: <SiSplunk />,
  newrelic: <SiNewrelic />,
  perl: <SiPerl />,
  kotlin: <SiKotlin />,
};

export const Timeline = ({ entries }: { entries?: TimelineEntry[] | null }) => {
  const items = entries?.length ? entries : defaultEntries;
  const theme = useTheme();

  return (
    <div>
      <VerticalTimeline lineColor={alpha(theme.palette.primary.main, 0.22)}>
        {items.map((e) => (
          <TimelineElement
            key={`${e.title}-${e.date}`}
            title={e.title}
            location={e.location}
            date={e.date}
            description={e.description}
            type={e.type}
            colors={{
              text: theme.palette.text.primary,
              paper: theme.palette.background.paper,
              divider: theme.palette.divider,
              iconBg:
                e.type === "education"
                  ? alpha(theme.palette.secondary.main, 0.65)
                  : theme.palette.primary.main,
              iconFg:
                e.type === "education"
                  ? theme.palette.text.primary
                  : theme.palette.primary.contrastText,
            }}
            icons={
              e.skills?.length
                ? e.skills
                    .map((s) => ({ s, icon: skillIcon[s.toLowerCase()] }))
                    .filter((x) => x.icon)
                    .map((x) => <span key={x.s}>{x.icon}</span>)
                : undefined
            }
          />
        ))}
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
  colors: {
    text: string;
    paper: string;
    divider: string;
    iconBg: string;
    iconFg: string;
  };
}

const TimelineElement = ({
  title,
  location,
  date,
  description,
  type,
  icons,
  colors,
}: TimelineElementProps) => {
  const typeIcon = type === "work" ? <FaBriefcase /> : <FaSchool />;
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element"
      contentStyle={{ background: colors.paper, color: colors.text }}
      contentArrowStyle={{ borderRight: `7px solid ${colors.divider}` }}
      date={date}
      iconStyle={{ background: colors.iconBg, color: colors.iconFg }}
      icon={typeIcon}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3>
      <h4 className="vertical-timeline-element-subtitle">{location}</h4>
      <p>{description}</p>
      {icons ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 1,
            "& svg": { fontSize: 18 },
          }}
        >
          {icons}
        </Box>
      ) : null}
    </VerticalTimelineElement>
  );
};
