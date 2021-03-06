const Nio = {
  symbol: 'nio',
  color: '#000',
  colorIcon() {
    return `<g fill="none"><circle cx="16" cy="16" r="16" fill="#70C9C9"/><path fill="#FFF" d="M16 13.764h-4.822L16 5.5l4.822 8.264H16zm.655 9.736l2.515-4.309 2.411-4.131L26.5 23.5h-9.845zm-3.825-4.309l2.515 4.309H5.5l4.919-8.44 2.41 4.131z"/></g>`;
  },
  plainIcon: c => {
    return `<path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-18.236h4.822L16 5.5l-4.822 8.264H16zm.655 9.736H26.5l-4.919-8.44-2.41 4.131-2.516 4.309zm-3.825-4.309l-2.411-4.131L5.5 23.5h9.845l-2.515-4.309z"/>`;
  }
};
export default Nio;
