const { random, sortBy } = require("lodash");

module.exports = (arr, size) => {
  const src = arr.slice();
  let ret = [];

  while (ret.length < size) {
    ret = ret.concat(src.splice(random(src.length - 1), 1));
  }

  return sortBy(ret);
};
