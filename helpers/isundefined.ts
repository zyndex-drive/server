export default (...props: []): boolean => {
  const resultArr = [];
  for (const prop in props) {
    if (prop) {
      if (prop !== null || prop !== undefined) {
        resultArr.push(true);
      } else {
        resultArr.push(false);
      }
    } else {
      resultArr.push(false);
    }
  }
  if (resultArr.includes(true)) {
    return false;
  }
  return true;
};
