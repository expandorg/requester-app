// @flow

const suggestFilter = (
  searchValue: string,
  suggestions: Array<string>
): Array<Object> => {
  const v = searchValue.toLowerCase();

  const filtered = suggestions.filter(
    s => !v || s.toLowerCase().indexOf(v) > -1
  );

  const length = filtered.length < 10 ? filtered.length : 10;

  return filtered.slice(0, length).map(name => ({ name }));
};

export default suggestFilter;
