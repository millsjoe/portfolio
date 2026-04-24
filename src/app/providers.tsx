"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    // Muted, modern palette (not in-your-face)
    primary: { main: "#2B5B66" }, // deep muted teal
    secondary: { main: "#6B5CA5" }, // soft muted violet
    background: {
      default: "#f3f6fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#0b1220",
      secondary: "rgba(11, 18, 32, 0.68)",
    },
    divider: "rgba(11, 18, 32, 0.10)",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    h1: {
      fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontWeight: 800,
      letterSpacing: -0.8,
    },
    h2: {
      fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontWeight: 800,
      letterSpacing: -0.6,
    },
    h3: {
      fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontWeight: 800,
      letterSpacing: -0.4,
    },
    h4: {
      fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontWeight: 800,
      letterSpacing: -0.3,
    },
    h5: {
      fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontWeight: 800,
      letterSpacing: -0.25,
    },
    h6: {
      fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontWeight: 800,
      letterSpacing: -0.2,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f3f6fa",
          backgroundImage: [
            `radial-gradient(1200px 520px at 10% -10%, ${alpha("#2B5B66", 0.22)} 0%, transparent 60%)`,
            `radial-gradient(900px 480px at 110% 10%, ${alpha("#6B5CA5", 0.16)} 0%, transparent 55%)`,
          ].join(","),
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

