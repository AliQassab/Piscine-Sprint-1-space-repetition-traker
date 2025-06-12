import test from "node:test";
import assert from "node:assert";
import { formatDate } from "../date/utils.mjs";

test("Formats date with correct ordinal suffix", () => {
  assert.strictEqual(formatDate("2025-06-01"), "1st June 2025");
  assert.strictEqual(formatDate("2025-06-02"), "2nd June 2025");
  assert.strictEqual(formatDate("2025-06-03"), "3rd June 2025");
  assert.strictEqual(formatDate("2025-06-04"), "4th June 2025");
  assert.strictEqual(formatDate("2025-06-11"), "11th June 2025");
  assert.strictEqual(formatDate("2025-06-21"), "21st June 2025");
  assert.strictEqual(formatDate("2025-06-22"), "22nd June 2025");
  assert.strictEqual(formatDate("2025-06-23"), "23rd June 2025");
});
