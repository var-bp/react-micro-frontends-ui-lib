// 0 turtles, 1 turtle, 2 turtles
const pluralize = (count: number, noun: string, suffix = 's'): string =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

export default pluralize;
