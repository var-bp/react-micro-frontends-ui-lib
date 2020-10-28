const generateId = (length = 10): string => {
  const arr = new Uint8Array(length / 2);
  (window.crypto || window.msCrypto).getRandomValues(arr);
  return Array.from(arr, (dec) => `0${dec.toString(16)}`.substr(-2)).join('');
};

export default generateId;
