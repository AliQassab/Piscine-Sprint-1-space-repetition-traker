import { getUserIDs } from "../data/common.mjs";
import { getRevisionDates } from '../date/utils.mjs';
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIDs().length, 5); // update 5 to your actual expected count
});

test('calculate correct repetition dates', () => {
  const dates = getRevisionDates('2025-07-19', 'Functions');
  const expected = [
    { topic: 'Functions', date: '2025-07-26' },
    { topic: 'Functions', date: '2025-08-18' },
    { topic: 'Functions', date: '2025-10-17' },
    { topic: 'Functions', date: '2026-01-15' },
    { topic: 'Functions', date: '2026-07-19' }
  ];
  assert.deepEqual(dates, expected);
});

