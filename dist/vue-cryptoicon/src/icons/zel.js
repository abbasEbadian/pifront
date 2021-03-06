const Zel = {
  symbol: 'zel',
  color: '#000',
  colorIcon() {
    return `<g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#183C87" fill-rule="nonzero"/><path fill="#FFF" d="M5 15.615l4.495-2.538 4.494 2.538v4.847L9.495 23 5 20.462v-4.847zm13.01 0l4.495-2.538L27 15.615v4.847L22.505 23l-4.494-2.538v-4.847zm-.472 4.21l-1.577.867-1.499-.823V15.23l-4.1-2.316V11.23L15.961 8l5.598 3.23v1.73l-4.021 2.27v4.596z"/></g>`;
  },
  plainIcon: c => {
    return `<path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM5 15.615v4.847L9.495 23l4.494-2.538v-4.847l-4.494-2.538L5 15.615zm13.01 0v4.847L22.506 23 27 20.462v-4.847l-4.495-2.538-4.494 2.538zm-.472 4.21v-4.594l4.021-2.271v-1.73L15.961 8l-5.599 3.23v1.685l4.1 2.316v4.638l1.499.823 1.577-.866z"/>`;
  }
};
export default Zel;
