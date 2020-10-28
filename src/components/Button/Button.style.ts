import styled from 'styled-components';
import { FontWeight, FontFamily, FontSize, LineHeight } from '../../typo';
import { White, Blue } from '../../colors';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.button`
  display: inline-block;
  font-weight: ${FontWeight.Normal};
  font-family: ${FontFamily[FontWeight.Normal]};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: ${FontSize.S};
  line-height: ${LineHeight[FontSize.S]};
  border-radius: 4px;
  color: ${White[1]};
  background-color: ${Blue[1]};
  border-color: ${Blue[1]};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: ${Blue[2]};
    border-color: ${Blue[2]};
  }
`;
