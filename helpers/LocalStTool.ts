export const LocalStTool = {
  _get: (key: string) => JSON.parse(localStorage.getItem(key) || 'null'),
  _add: (key: string, item: any) =>
    localStorage.setItem(key, JSON.stringify(item)),
};
