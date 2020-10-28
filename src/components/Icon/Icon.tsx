import React from 'react';
import Logo from './Logo';

type Valueof<T> = T[keyof T];

enum IconName {
  User = 'user',
}

interface PropTypes {
  name: Valueof<IconName>;
  size: number;
  color: string;
}

// SVG 2 JSX https://svg2jsx.com/
const Icon = ({ name, size, color }: PropTypes): JSX.Element => {
  switch (name) {
    case 'logo':
      return <Logo size={size} color={color} />;
    default:
      return null;
  }
};

export default Icon;
