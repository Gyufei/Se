import localFont from "next/font/local";

export const SpaceGroteskFont = localFont({
  src: [
    {
      path: "../public/fonts/SpaceGrotesk-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SpaceGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Segoe UI",
    "Ubuntu",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});
