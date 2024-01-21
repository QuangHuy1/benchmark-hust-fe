import { extendTheme } from "@chakra-ui/react";

const BreakpointConfig = {
  breakpoints: {
    xs: "320px", // mobile
    sm: "480px",
    md: "768px", // tablet
    lg: "992px",
    xl: "1280px", // desktop
    "2xl": "1600px",
  },
};

const ColorConfig = {
  colors: {
    text: { 1: "darkred", 2: "darkred" },
    link: { 1: "darkred" },
    main: { 1: "#ECECEC", 2: "#ECECEC", 0: "darkred" },
  },
};

const FontConfig = {
  fonts: {
    heading: `'Quicksand', sans-serif`,
  },
};

export const chakraTheme = extendTheme({
  // ...ComponentsTheme,
  ...FontConfig,
  ...ColorConfig,
  ...BreakpointConfig,
  // ...MiscConfig,
  // ...GlobalConfig
});
