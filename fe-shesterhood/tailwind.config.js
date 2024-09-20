module.exports = {
  content: ["./src/**/*.{html,js}"], // Sesuaikan dengan struktur proyekmu
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Tambahkan nama font di sini
      },
      colors: {
        pink : '#F1398F',
        green : '#15B2A7',
        orange : '#FFA43A',
        grey : '#F3F3F3',
        grey2 : '#7E7E7E',
        salem : '#F7ECE8',
        red : '#BB2117',
      },
      dropShadow: {
        'sm': '0 1px 1px rgb(0 0 0 / 0.05)',
        'default': '0 1px 2px rgb(0 0 0 / 0.1) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
        'md': '0 4px 3px rgb(0 0 0 / 0.07) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
        'lg': '0 10px 8px rgb(0 0 0 / 0.04) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
        'xl': '0 20px 13px rgb(0 0 0 / 0.03) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
        '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
        'none': '0 0 #0000',
      }
    },
  },
  plugins: [],
}
