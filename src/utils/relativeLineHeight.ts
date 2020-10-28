import { stripUnit } from 'polished';

// With a font size of 16px and a line-height of 24px, the conversion gives us a value of 1.5 for the line-height.
const relativeLineHeight = (fontSize: string, lineHeight: string, precision = 2): number =>
  +(stripUnit(lineHeight) / stripUnit(fontSize)).toFixed(precision);

export default relativeLineHeight;
