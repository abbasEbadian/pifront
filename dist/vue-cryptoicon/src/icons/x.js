const X = {
  symbol: 'x',
  color: '#000',
  colorIcon() {
    return `<g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#3B5998" fill-rule="nonzero"/><g fill="#FFF"><path d="M14.116 6.01h1.88v5.882l-1.88-1.963z"/><path d="M6.011 7.993h4.949c1.677 1.755 3.361 3.507 5.038 5.266.971-1.009 1.939-2.025 2.906-3.037.715-.741 1.427-1.486 2.14-2.23h4.937c-2.304 2.33-4.605 4.662-6.91 6.99-.242.243-.485.488-.722.734.058.062.12.123.172.189l6.771 6.846.691.696h-3.83c-.099 0-.198.006-.295-.007-.273-.008-.547.004-.82-.006-.495-.511-.984-1.029-1.479-1.542-.973-1.012-1.942-2.03-2.915-3.044-.216-.224-.427-.454-.648-.672-.47.5-.952.993-1.425 1.493l-2.677 2.794c-.312.325-.62.652-.934.971-.27.008-.542 0-.814.004-.155.019-.312.006-.467.01H6.01l7.268-7.35c.125-.126.249-.253.37-.382L6.01 7.993z"/><path d="M16 19.531c.626.663 1.26 1.319 1.888 1.98.004 1.307 0 2.612 0 3.92h-1.89c0-1.967 0-3.933.004-5.9H16z"/></g></g>`;
  },
  plainIcon: c => {
    return `<path fill-rule="evenodd" fill="${
      c ? c : this.color
    }" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM14.116 6.01v3.919l1.88 1.963V6.009h-1.88zM6.01 7.992l7.638 7.723c-.121.129-.245.256-.37.381l-7.268 7.35h3.67c.155-.003.312.01.467-.01.272-.003.543.005.814-.003.314-.32.622-.646.934-.97l2.677-2.795c.473-.5.955-.993 1.425-1.493.22.218.432.448.648.672.973 1.014 1.942 2.032 2.915 3.044.495.513.984 1.03 1.48 1.542.272.01.546-.002.82.006.096.013.195.007.294.007h3.83l-.69-.696-6.772-6.846c-.052-.066-.114-.127-.172-.189.237-.246.48-.491.723-.734 2.304-2.328 4.605-4.66 6.91-6.99h-4.938c-.713.744-1.425 1.489-2.14 2.23-.967 1.012-1.935 2.028-2.906 3.037-1.677-1.76-3.361-3.511-5.038-5.266H6.01zM16 19.53h.002c-.004 1.967-.004 3.933-.004 5.9h1.89c0-1.308.004-2.613 0-3.92-.627-.661-1.262-1.317-1.888-1.98z"/>`;
  }
};
export default X;