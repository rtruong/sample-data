const accounts = require("./accounts");
const costObjects = require("./costObjects");
const expenseTypes = require("./expenseTypes");
const locations = require("./locations");
const randomizeData = require("./randomizeData");
const vendors = require("./vendors");
const { padStart, random, sortBy, times } = require("lodash");

module.exports = (size) => {
  return {
    accounts: randomizeData(accounts, size),
    costCenters: sortBy(
      times(size, () => `CC-${padStart(random(999), 3, "0")}`)
    ),
    costObjects: randomizeData(costObjects, size),
    expenseTypes,
    locations: randomizeData(locations, size),
    vendors: randomizeData(vendors, size),
  };
};
