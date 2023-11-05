const getClassNames = (classNames) => {
  const filtered = classNames.filter((i) => typeof i === 'string' && i !== undefined);
  return filtered.join(' ')
};
export default getClassNames;