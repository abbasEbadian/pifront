const Utk = {
  symbol: 'utk',
  color: '#000',
  colorIcon() {
    return `<g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#30367a" r="16"/><path d="M14.353 22.298V9.028H10.5V6h11v3.028h-3.853v13.27zM13.466 26c-1.989 0-2.93-.956-2.93-2.978V9.896h2.894v12.992c0 .32.105.426.419.426h4.339c.314 0 .42-.107.42-.426V9.896H21.5v13.126c0 2.022-.942 2.978-2.93 2.978z" fill="#fff" fill-rule="nonzero"/></g>`;
  },
  plainIcon: c => {
    return `<path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-1.647-9.702h3.294V9.028H21.5V6h-11v3.028h3.853zM13.466 26h5.104c1.988 0 2.93-.956 2.93-2.978V9.896h-2.893v12.992c0 .32-.105.426-.419.426h-4.34c-.313 0-.418-.107-.418-.426V9.896h-2.893v13.126c0 2.022.94 2.978 2.93 2.978z" fill-rule="evenodd"/>`;
  }
};
export default Utk;
