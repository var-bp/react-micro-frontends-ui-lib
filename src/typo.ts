import { relativeLineHeight } from './utils';

export enum FontWeight {
  Normal = 400,
}

export const FontFamily: { [key in FontWeight]: string } = {
  [FontWeight.Normal]: 'Roboto Regular, sans-serif',
};

// https://ant.design/docs/spec/font#Font-Scale-&-Line-Height
export enum FontSize {
  XXS = '12px',
  XS = '14px',
  S = '16px',
  M = '20px',
  L = '24px',
  XL = '30px',
  XXL = '38px',
}

// https://ant.design/docs/spec/font#Font-Scale-&-Line-Height
export const LineHeight: { [key in FontSize]: string } = {
  [FontSize.XXS]: relativeLineHeight(FontSize.XXS, '20px'),
  [FontSize.XS]: relativeLineHeight(FontSize.XS, '22px'),
  [FontSize.S]: relativeLineHeight(FontSize.S, '24px'),
  [FontSize.M]: relativeLineHeight(FontSize.M, '28px'),
  [FontSize.L]: relativeLineHeight(FontSize.L, '32px'),
  [FontSize.XL]: relativeLineHeight(FontSize.XL, '38px'),
  [FontSize.XXL]: relativeLineHeight(FontSize.XXL, '46px'),
};
