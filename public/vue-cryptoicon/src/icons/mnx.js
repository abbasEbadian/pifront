const Mnx = {
  symbol: 'mnx',
  color: '#000',
  colorIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#00ADEF" fill-rule="nonzero"/><path fill="#FFF" d="M14.863 26.986C9.32 26.405 5 21.708 5 16c0-5.708 4.32-10.405 9.863-10.986v3.37A7.7 7.7 0 008.336 16a7.7 7.7 0 006.527 7.616v3.37zM17.038 5c5.23.479 9.403 4.617 9.948 9.837h-3.363a7.7 7.7 0 00-6.585-6.474V5zM27 17.017c-.482 5.29-4.684 9.5-9.962 9.983v-3.363a7.7 7.7 0 006.606-6.62H27z"/></g>`;
  },
  plainIcon: c => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M14.863 26.986v-3.37A7.7 7.7 0 018.336 16a7.7 7.7 0 016.527-7.616v-3.37C9.32 5.595 5 10.292 5 16c0 5.708 4.32 10.405 9.863 10.986zM17.038 5v3.363a7.7 7.7 0 016.585 6.474h3.363C26.44 9.617 22.268 5.48 17.038 5zM27 17.017h-3.356a7.7 7.7 0 01-6.606 6.62V27c5.278-.483 9.48-4.694 9.962-9.983zM16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z"/>`;
  }
};
export default Mnx;