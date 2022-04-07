const Bcn = {
  symbol: 'bcn',
  color: '#000',
  colorIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none"><circle cx="15.999" cy="15.999" r="15.999" fill="#F04086"/><path fill="#FFF" d="M23.437 16.754c-.63-.696-1.536-1.128-2.72-1.296v-.025c1.037-.168 1.852-.593 2.406-1.273a3.717 3.717 0 00.862-2.404c0-1.461-.47-2.454-1.444-3.235-.974-.78-2.436-1.037-4.417-1.037h-7.481v6.963H6.347v2.667h11.727c.923 0 1.616.065 2.074.434.458.369.692.846.692 1.551s-.231 1.307-.692 1.685c-.46.377-1.154.626-2.074.626H14.05v-2.074h-3.407v4.741h7.727c1.965 0 3.467-.513 4.509-1.31 1.041-.797 1.53-1.974 1.53-3.419a3.81 3.81 0 00-.972-2.594zm-5.793-2.314H14.05v-4.296h3.594c1.848 0 2.77.721 2.77 2.148s-.922 2.148-2.77 2.148z"/></g>`;
  },
  plainIcon: c => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M15.999 31.997C7.163 31.997 0 24.834 0 15.999 0 7.163 7.163 0 15.999 0c8.835 0 15.998 7.163 15.998 15.999 0 8.835-7.163 15.998-15.998 15.998zm7.438-15.243c-.63-.696-1.536-1.128-2.72-1.296v-.025c1.037-.168 1.852-.593 2.406-1.273a3.717 3.717 0 00.862-2.404c0-1.461-.47-2.454-1.444-3.235-.974-.78-2.436-1.037-4.417-1.037h-7.481v6.963H6.347v2.667h11.727c.923 0 1.616.065 2.074.434.458.369.692.846.692 1.551s-.231 1.307-.692 1.685c-.46.377-1.154.626-2.074.626H14.05v-2.074h-3.407v4.741h7.727c1.965 0 3.467-.513 4.509-1.31 1.041-.797 1.53-1.974 1.53-3.419a3.81 3.81 0 00-.972-2.594zm-5.793-2.314H14.05v-4.296h3.594c1.848 0 2.77.721 2.77 2.148s-.922 2.148-2.77 2.148z"/>`;
  }
};
export default Bcn;