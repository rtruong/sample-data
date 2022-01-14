const { OrderedMap } = require("immutable");
const { chunk, map, reduce, sum, times } = require("lodash");

function roundedSum(arr) {
  return Math.round(sum(arr) * 100) / 100;
}

module.exports = () => {
  const months = times(72, () => Math.round(Math.random() * 100000) / 100);

  return reduce(
    map(chunk(months, 12), (arr) => roundedSum(arr)),
    (ret, val, i) => ret.set(`Amount.FY${i}`, val),
    reduce(
      map(chunk(months, 3), (arr) => roundedSum(arr)),
      (ret, val, i) => ret.set(`Amount.Q${i}`, val),
      reduce(
        months,
        (ret, val, i) => ret.set(`Amount.P${i}`, val),
        OrderedMap({})
      )
    )
  ).toObject();
};
