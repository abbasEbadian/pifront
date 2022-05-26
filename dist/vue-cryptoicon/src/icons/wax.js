const Wax = {
  symbol: 'wax',
  color: '#000',
  colorIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#f89022" r="16"/><path d="M28 18.962h-2.364l-1.677-1.436-1.671 1.43H20.29l-.955-1.16h-3.292l.833-1.029h1.619l-1.233-1.508-4.305 5.241H10.96l1.246-1.522h-2.081L9 15.824l-1.116 3.13H5.773L4 14.041h1.62l1.192 3.346L8 14.056h2l1.185 3.324 1.184-3.325h1.625l-1.788 4.923.398-.486 3.652-4.445h2.01l3.039 3.708 1.462-1.257L18.14 12.5h2.375zm-2.345-2.972l-1.115-.956 1.113-.948 2.25.002z" fill="#fff"/></g>`;
  },
  plainIcon: c => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm12-13.038L20.516 12.5h-2.375l4.625 3.998-1.461 1.257-3.039-3.708h-2.01l-3.652 4.445-.398.486 1.788-4.923H12.37l-1.184 3.325L10 14.056H8l-1.188 3.332-1.192-3.346H4l1.773 4.911h2.112L9 15.823l1.124 3.155h2.08L10.96 20.5h1.997l4.305-5.241 1.233 1.508h-1.619l-.833 1.029h3.292l.955 1.16h1.998l1.671-1.43 1.677 1.436zm-2.345-2.972l2.249-1.902-2.251-.002-1.113.948z" fill-rule="evenodd"/>`;
  }
};
export default Wax;