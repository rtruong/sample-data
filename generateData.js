const fs = require("fs");
const generateAmounts = require("./generateAmounts");
const refData = require("./refData");

const PATH = "./build/dist/cache/libs/sample-data";

module.exports = (rows) => {
  const {
    accounts,
    costCenters,
    costObjects,
    expenseTypes,
    locations,
    vendors,
  } = refData(Math.ceil(Math.pow(rows / 2, 1 / 5)));
  fs.mkdirSync(PATH, {
    recursive: true,
  });

  const out = fs.createWriteStream(`${PATH}/${rows}.json`, "utf-8");
  let emitted = 0;

  out.write("[");
  for (
    let accountIndex = 0;
    accountIndex < accounts.length && emitted < rows;
    accountIndex++
  ) {
    for (
      let costCenterIndex = 0;
      costCenterIndex < costCenters.length && emitted < rows;
      costCenterIndex++
    ) {
      for (
        let costObjectIndex = 0;
        costObjectIndex < costObjects.length && emitted < rows;
        costObjectIndex++
      ) {
        for (
          let expenseTypeIndex = 0;
          expenseTypeIndex < expenseTypes.length && emitted < rows;
          expenseTypeIndex++
        ) {
          for (
            let locationIndex = 0;
            locationIndex < locations.length && emitted < rows;
            locationIndex++
          ) {
            for (
              let vendorIndex = 0;
              vendorIndex < vendors.length && emitted < rows;
              vendorIndex++
            ) {
              out.write(
                JSON.stringify({
                  "Account.ExpenseType.Name": expenseTypes[expenseTypeIndex],
                  "Account.Name": accounts[accountIndex],
                  "CostCenter.Code": costCenters[costCenterIndex],
                  "CostCenter.Name": costCenters[costCenterIndex],
                  "CostObject.Name": costObjects[costObjectIndex],
                  "Currency.Code": "USD",
                  Id: `row${emitted}`,
                  "Location.Name": locations[locationIndex],
                  "Vendor.Name": vendors[vendorIndex],
                  ...generateAmounts(),
                })
              );
              emitted++;

              if (emitted < rows) {
                out.write(",");
              }
            }
          }
        }
      }
    }
  }
  out.write("]");
  out.end();
};
