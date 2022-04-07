const Sberbank = {
  symbol: 'sberbank',
  color: '#000',
  colorIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#48B254" fill-rule="nonzero"/><path fill="#FFF" d="M22.681 7.368l.945.858-11.932 6.812-5.776-3.325.54-1.073 5.236 2.977 10.987-6.25zM20.279 6l1.268.644-9.853 5.632-4.588-2.602.782-.938 3.806 2.172L20.28 6zm4.184 3.111l.701.939-13.47 7.697-6.505-3.701.297-1.18 6.208 3.54 12.769-7.295zm1.943 3.46c.396 1.109.594 2.27.594 3.486 0 1.216-.198 2.397-.594 3.54l-.27.725a11.142 11.142 0 01-2.348 3.486 10.85 10.85 0 01-3.51 2.307c-1.385.59-2.815.885-4.291.885-1.494 0-2.925-.295-4.293-.885a11.341 11.341 0 01-3.482-2.307 10.568 10.568 0 01-2.348-3.486c-.57-1.35-.865-2.8-.864-4.265v-.724l6.694 3.782 14.118-8.046.594 1.502z"/></g>`;
  },
  plainIcon: c => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm6.681-24.632l-10.987 6.249-5.236-2.977-.54 1.073 5.776 3.325 11.932-6.812-.945-.858zM20.279 6l-8.585 4.908-3.806-2.172-.782.938 4.588 2.602 9.853-5.632L20.28 6zm4.184 3.111l-12.769 7.295-6.208-3.54-.297 1.18 6.505 3.701 13.47-7.697-.701-.939zm1.943 3.46l-.594-1.502-14.118 8.046L5 15.333v.724c0 1.465.293 2.915.864 4.265a10.568 10.568 0 002.348 3.486 11.341 11.341 0 003.482 2.307c1.368.59 2.799.885 4.293.885 1.476 0 2.906-.295 4.292-.885a10.85 10.85 0 003.509-2.307 11.142 11.142 0 002.348-3.486l.27-.724c.396-1.144.594-2.325.594-3.54 0-1.217-.198-2.378-.594-3.487z"/>`;
  }
};
export default Sberbank;