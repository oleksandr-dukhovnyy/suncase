export default (path: string) =>
  `${process.env.NODE_ENV === 'production' ? '/suncase' : ''}/img/${path}`;
