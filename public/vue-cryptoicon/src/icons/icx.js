const Icx = {
  symbol: 'icx',
  color: '#000',
  colorIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#1fc5c9" r="16"/><path d="M11.296 22.472l2.164-2.164a5 5 0 006.848-6.848l2.164-2.164a8 8 0 01-11.176 11.176zm-1.768-1.768A8 8 0 0120.704 9.528l-2.164 2.164a5 5 0 00-6.848 6.848zM24 10a2 2 0 110-4 2 2 0 010 4zM8 26a2 2 0 110-4 2 2 0 010 4z" fill="#fff"/></g>`;
  },
  plainIcon: c => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M11.296 22.472a8 8 0 0011.176-11.176l-2.164 2.164a5 5 0 01-6.848 6.848zm-1.768-1.768l2.164-2.164a5 5 0 016.848-6.848l2.164-2.164A8 8 0 009.528 20.704zM16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm8-22a2 2 0 100-4 2 2 0 000 4zM8 26a2 2 0 100-4 2 2 0 000 4z" fill-rule="evenodd"/>`;
  }
};
export default Icx;
