/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.njk"],
  theme: {
    extend: {
      colors: {
        'red': {
          '50': '#ffefef',
          '100': '#ffdcdc',
          '200': '#ffbfbf',
          '300': '#ff9292',
          '400': '#ff5454',
          '500': '#ff1f1f',
          '600': '#ff0000',
          '700': '#db0000',
          '800': '#b80000',
          '900': '#940808',
        },
      },
    },
  },
  plugins: [],
  experimental: {
    optimizeUniversalDefaults: true
  }
}
