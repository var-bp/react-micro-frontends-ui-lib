import { css } from 'styled-components';

export const imgFluid = css`
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
`;

export const fitImage = css`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

// paddingBottom = (height / width) * 100%
export const intrinsicRatio = (paddingBottom: string): string => css`
  position: relative;
  padding-bottom: ${paddingBottom};
  height: 0;
  overflow: hidden;

  & > *:first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const imageRender = css`
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: bicubic;
`;

export const truncateString = (width: string): string => css`
  width: ${width || 'auto'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const preventTextOverflow = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`;
