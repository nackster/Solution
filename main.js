/**
 * Sorts a package into STANDARD, SPECIAL or REJECTED
 *
 * @param {number} width   in cm
 * @param {number} height  in cm
 * @param {number} length  in cm
 * @param {number} mass    in kg
 * @returns {"STANDARD"|"SPECIAL"|"REJECTED"}
 */
function sort(width, height, length, mass) {
  const volume = width * height * length;
  const isBulky = volume >= 1_000_000 || Math.max(width, height, length) >= 150;
  const isHeavy = mass >= 20;

  if (isBulky && isHeavy)   return "REJECTED";
  if (isBulky || isHeavy)   return "SPECIAL";
  return "STANDARD";
}

// ——————————————————————————————————————————————————————————————————————————
// Test suite
// ——————————————————————————————————————————————————————————————————————————
function runTests() {
  const tests = [
    // STANDARD: neither bulky nor heavy
    { args: [10, 10, 10, 5],     want: "STANDARD" },
    // SPECIAL: bulky only
    { args: [100, 100, 100, 5],   want: "SPECIAL" }, 
    { args: [150, 1, 1, 5],       want: "SPECIAL" },  
    // SPECIAL: heavy only
    { args: [10, 10, 10, 20],     want: "SPECIAL" },  
    // REJECTED: both bulky and heavy
    { args: [100, 100, 100, 20],  want: "REJECTED" },
    { args: [150, 2, 2, 25],      want: "REJECTED" },

    // edge-cases
    { args: [0, 0, 0, 0],         want: "STANDARD" }, 
    { args: [100, 100, 99.9, 19.9], want: "STANDARD" },
    { args: [100, 100, 99.9, 20],   want: "SPECIAL" }, 
    { args: [100, 100, 100, 19.9],  want: "SPECIAL" },  
  ];

  let failures = 0;
  for (const t of tests) {
    const got = sort(...t.args);
    if (got !== t.want) {
      console.error(`sort(${t.args.join(", ")}) => "${got}", want "${t.want}"`);
      failures++;
    } else {
      console.log(`sort(${t.args.join(", ")}) => "${got}"`);
    }
  }

  if (failures === 0) {
    console.log("\nAll tests passed!");
  } else {
    console.warn(`\n${failures} test(s) failed.`);
  }
}

// Run the tests
runTests();
