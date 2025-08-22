#!/usr/bin/env node
import { nthPlate, plateIndex, TOTAL_PLATES } from "./license-plate.js";

const args = process.argv.slice(2);

function usage() {
  console.error("Usage:");
  console.error("  yarn start <index>        # index -> plate");
  console.error("  yarn start -r <PLATE>     # plate -> index");
  console.error(`Range: index in [0, ${TOTAL_PLATES - 1}]`);
}

if (args.length === 0) {
  usage();
  process.exit(1);
}

if (args[0] === "-r") {
  const plate = args[1];
  if (!plate) {
    usage();
    process.exit(1);
  }
  try {
    console.log(plateIndex(plate));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
} else {
  const n = Number(args[0]);
  if (!Number.isInteger(n) || n < 0) {
    usage();
    process.exit(1);
  }
  try {
    console.log(nthPlate(n));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
