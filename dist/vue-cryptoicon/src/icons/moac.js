const Moac = {
  symbol: 'moac',
  color: '#000',
  colorIcon() {
    return `<g fill="none"><circle cx="16" cy="16" r="16" fill="#000"/><path d="M15.792 15.792L9.423 9.423l-.138-.208L7.02 7v17.515h2.284V12.4l4.916 4.985 1.592 1.592 1.592-1.592L22.32 12.4v12.115h2.284V7L22.32 9.215z" fill="#FFF"/></g>`;
  },
  plainIcon: c => {
    return `<path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-.208-16.208L9.423 9.423l-.138-.208L7.02 7v17.515h2.284V12.4l4.916 4.985 1.592 1.592 1.592-1.592L22.32 12.4v12.115h2.284V7L22.32 9.215l-6.529 6.577z"/>`;
  }
};
export default Moac;
