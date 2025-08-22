const POW10 = Array.from({ length: 7 }, (_, i) => 10 ** i); // 10^0 .. 10^6
const POW26 = Array.from({ length: 7 }, (_, i) => 26 ** i); // 26^0 .. 26^6

// Precompute block sizes for k=0..6
const BLOCK_SIZES = Array.from(
  { length: 7 },
  (_, k) => POW10[6 - k] * POW26[k]
);

// Total number of plates in this DMV scheme
export const TOTAL_PLATES = BLOCK_SIZES.reduce((a, b) => a + b, 0);

export function nthPlate(n) {
  if (!Number.isInteger(n) || n < 0 || n >= TOTAL_PLATES) {
    throw new RangeError(`n out of range (0..${TOTAL_PLATES - 1})`);
  }

  let k = 0;
  let offset = n;
  while (offset >= BLOCK_SIZES[k]) {
    offset -= BLOCK_SIZES[k];
    k++;
  }

  const numLen = 6 - k;
  const groupSize = POW10[numLen];
  const letterIndex = Math.floor(offset / groupSize);
  const prefixIndex = offset % groupSize;

  const prefix = numLen > 0 ? String(prefixIndex).padStart(numLen, "0") : "";

  let letters = "";
  for (let i = 0; i < k; i++) {
    const digit = (letterIndex / POW26[k - 1 - i]) | 0;
    letters += String.fromCharCode(65 + (digit % 26));
  }

  return prefix + letters;
}

export function plateIndex(plate) {
  if (!/^[0-9A-Z]{6}$/.test(plate)) {
    throw new Error("Invalid plate: must be 6 chars [0-9A-Z]");
  }
  let k = 0;
  for (let i = 5; i >= 0; i--) {
    const c = plate[i];
    if (c >= "A" && c <= "Z") k++;
    else break;
  }
  const numLen = 6 - k;

  for (let i = 0; i < numLen; i++) {
    const c = plate[i];
    if (c < "0" || c > "9") {
      throw new Error("Invalid plate: letters must be a right-aligned block");
    }
  }
  for (let i = numLen; i < 6; i++) {
    const c = plate[i];
    if (c < "A" || c > "Z") {
      throw new Error("Invalid plate: letters must be a right-aligned block");
    }
  }

  let base = 0;
  for (let j = 0; j < k; j++) base += BLOCK_SIZES[j];

  const prefixIndex = numLen ? Number(plate.slice(0, numLen)) : 0;

  let letterIndex = 0;
  for (let i = numLen; i < 6; i++) {
    letterIndex = letterIndex * 26 + (plate.charCodeAt(i) - 65);
  }

  const groupSize = POW10[numLen];
  return base + letterIndex * groupSize + prefixIndex;
}
