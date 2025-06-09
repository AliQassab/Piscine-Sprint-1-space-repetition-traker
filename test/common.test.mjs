import { getUserIDs } from "../data/common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIDs().length, 5);
});
