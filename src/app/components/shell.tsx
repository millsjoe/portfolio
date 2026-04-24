"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMemo, useState } from "react";
import MenuRounded from "@mui/icons-material/MenuRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MovieRounded from "@mui/icons-material/MovieRounded";
import ArticleRounded from "@mui/icons-material/ArticleRounded";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";

const navItems = [
  { href: "/", label: "Home", icon: <HomeRounded /> },
  { href: "/read", label: "Read", icon: <MenuBookRounded /> },
  { href: "/watched", label: "Watched", icon: <MovieRounded /> },
  { href: "/blog", label: "Blog", icon: <ArticleRounded /> },
];

const socialItems = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joe-mills/",
    icon: <FaLinkedin />,
  },
  { label: "Bluesky", href: "https://bsky.app/profile/mills.codes", icon: <FaBluesky /> },
  { label: "GitHub", href: "https://github.com/millsjoe", icon: <FaGithub /> },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const active = useMemo(
    () => navItems.find((x) => x.href === pathname)?.href ?? "/",
    [pathname]
  );

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "transparent" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: alpha("#f3f6fa", 0.65),
          backgroundImage: [
            `radial-gradient(800px 240px at 0% 0%, ${alpha("#2B5B66", 0.18)} 0%, transparent 60%)`,
            `radial-gradient(600px 220px at 100% 0%, ${alpha("#6B5CA5", 0.14)} 0%, transparent 55%)`,
          ].join(","),
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ gap: 1 }}>
            {!isDesktop ? (
              <IconButton
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                edge="start"
              >
                <MenuRounded />
              </IconButton>
            ) : null}

            <Typography
              component={Link}
              href="/"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: 900,
                letterSpacing: -0.3,
              }}
            >
              Joe Mills
            </Typography>

            <Box sx={{ flex: 1 }} />

            {isDesktop ? (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {navItems.map((item) => {
                  const selected = item.href === active;
                  return (
                    <Box
                      key={item.href}
                      component={Link}
                      href={item.href}
                      sx={{
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 999,
                        textDecoration: "none",
                        color: selected ? "primary.contrastText" : "text.primary",
                        bgcolor: selected ? "primary.main" : "transparent",
                        fontWeight: 800,
                        fontSize: 14,
                        "&:hover": {
                          bgcolor: selected
                            ? "primary.dark"
                            : "rgba(43, 91, 102, 0.07)",
                        },
                      }}
                    >
                      {item.label}
                    </Box>
                  );
                })}
              </Box>
            ) : null}

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, ml: 0.75 }}>
              {socialItems.map((item) => (
                <IconButton
                  key={item.href}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  size="small"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                    "& svg": { fontSize: 18 },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ py: 3 }}>{children}</Container>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: alpha("#f3f6fa", 0.92),
              backgroundImage: [
                `radial-gradient(900px 300px at 0% 0%, ${alpha("#2B5B66", 0.18)} 0%, transparent 60%)`,
                `radial-gradient(700px 280px at 100% 0%, ${alpha("#6B5CA5", 0.14)} 0%, transparent 55%)`,
              ].join(","),
              backdropFilter: "blur(10px)",
            },
          },
        }}
      >
        <Box sx={{ width: 280 }} role="presentation">
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.25,
              }}
            >
              Menu
            </Typography>

            <IconButton
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              size="small"
              sx={{ color: "text.secondary" }}
            >
              <CloseRounded />
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ py: 0.5 }}>
            {navItems.map((item) => (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                selected={item.href === active}
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.25,
                  "&.Mui-selected": {
                    bgcolor: alpha("#2B5B66", 0.10),
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: alpha("#2B5B66", 0.14),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 850,
                      letterSpacing: -0.15,
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

