import { ThemeProvider } from "styled-components";

export type themeEnum = "dark" | "light";

const lightColors = {
  primary: { bgColor: "#6200ee", color: "#ffffff" },
  primaryVariant: { bgColor: "#3700b3", color: "#ffffff" },
  secondary: { bgColor: "#03dac6", color: "#000000" },
  secondaryVariant: { bgColor: "#018786", color: "#000000" },
  background: { bgColor: "#ffffff", color: "#000000" },
  surface: { bgColor: "#ffffff", color: "#000000" },
  error: { bgColor: "#b00020", color: "#ffffff" },
};

const light = {
  isDark: false,
  ...lightColors,
};

const dark = {
  isDark: true,
  ...lightColors,
};

const themes = {
  light,
  dark,
};

interface Props {
  theme: themeEnum;
  children: any;
}

const Theme = ({ theme, children }: Props) => (
  <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
);

export default Theme;
