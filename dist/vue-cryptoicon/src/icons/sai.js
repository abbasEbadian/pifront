const Sai = {
  symbol: 'sai',
  color: '#000',
  colorIcon() {
    return `<g fill="none"><circle cx="16" cy="16" r="16" fill="#B68900"/><path d="M26.633 15.817L15.817 5 5 15.817l10.817 3.996 10.816-3.996zM8.364 14.9l7.333-7.498s7.169 7.333 7.471 7.48c.303.146-4.931 0-4.931 0l-2.42-2.475-2.448 2.493H8.364zm7.453 5.674l10.816-4.024-10.816 10.083L5 16.605l10.817 3.97z" fill="#FFF"/></g>`;
  },
  plainIcon: c => {
    return `<path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm10.633-16.183L15.817 5 5 15.817l10.817 3.996 10.816-3.996zM8.364 14.9l7.333-7.498s7.169 7.333 7.471 7.48c.303.146-4.931 0-4.931 0l-2.42-2.475-2.448 2.493H8.364zm7.453 5.674L5 16.605l10.817 10.028L26.633 16.55l-10.816 4.024z"/>`;
  }
};
export default Sai;