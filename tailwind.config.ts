import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [],
  theme: {
    extends: {
      fontFamily: {
        DMSans: ["DMSans", ...defaultTheme.fontFamily.sans],
        BricolageGrotesque: [
          "BricolageGrotesque",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
