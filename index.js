#!/usr/bin/env node

const generateData = require("./generateData");
const { path } = require("yargs").argv;

generateData(50000, path);
generateData(100000, path);
generateData(250000, path);
generateData(500000, path);
generateData(1000000, path);
generateData(2000000, path);
