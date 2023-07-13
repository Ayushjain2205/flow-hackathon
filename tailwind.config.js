/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        NFT: "0px 4px 40px 0px rgba(210, 250, 227, 0.30)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        normalMode: {
          background: "#D2FAE3",
          arrow: "#D2FAE3",
          primary: "#262626",
          black: "#262626",
          secondary: "#959595",
        },
        devMode: {
          background: "#262626",
          arrow: "#262626",
          primary: "#D2FAE3",
          black: "#262626",
        },
      },
    ],
  },
}
