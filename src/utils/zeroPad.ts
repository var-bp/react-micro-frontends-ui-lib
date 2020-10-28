// 1 -> 01, 10 -> 10
const zeroPad = (number: number): string => `0${number}`.slice(-2);

export default zeroPad;
