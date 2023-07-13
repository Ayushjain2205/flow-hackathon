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
        mytheme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          background: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
        normalMode: {
          background: "#D2FAE3",
        },
        devMode: {
          background: "#262626",
        },
      },
      "dark",
      "cupcake",
    ],
  },
}
