import test from "node:test";
import assert from "node:assert";
import { renderAgenda } from "../path/to/renderAgenda.js"; // ← Update this path
import * as storage from "../data/storage.mjs";
import * as utils from "../date/utils.mjs";
//Simple formatDate mock
utils.formatDate = (date) => `Formatted(${date})`;
//Basic DOM setup for all tests
function setupDOM() {
  document.body.innerHTML = `
    <ul id="agenda-list"></ul>
    <div id="no-agenda-msg"></div>
    <button id="clear-btn"></button>
  `;
}
//Quick shortcut to get element by ID
const get = (id) => document.getElementById(id);

//No user selected
test("shows 'Select a User' if userId is null", () => {
  setupDOM();
  renderAgenda(null);
  assert.match(get("no-agenda-msg").innerHTML, /Select a User/);
});

//No topics
test("shows 'No Topics' if user has no data", () => {
  setupDOM();
  storage.getData = () => [];
  renderAgenda("user1");
  assert.match(get("no-agenda-msg").innerHTML, /No Topics/);
  assert.ok(get("clear-btn").hidden);
});

//Shows and sorts topics
test("renders sorted topics", () => {
  setupDOM();
  storage.getData = () => [
    { topic: "Later", date: "2025-07-10" },
    { topic: "Sooner", date: "2025-07-01" }
  ];
  renderAgenda("user1");
  const items = [...document.querySelectorAll("li")];
  assert.equal(items.length, 2);
  assert.match(items[0].textContent, /Sooner/);
});

//getData returns null
test("handles null data", () => {
  setupDOM();
  storage.getData = () => null;
  renderAgenda("user1");
  assert.match(get("no-agenda-msg").innerHTML, /No Topics/);
});

//Clears old list
test("clears previous list", () => {
  setupDOM();
  get("agenda-list").innerHTML = "<li>Old</li>";
  storage.getData = () => [];
  renderAgenda("user1");
  assert.equal(get("agenda-list").children.length, 0);
});

//Uses formatDate
test("uses formatDate to show date", () => {
  setupDOM();
  storage.getData = () => [{ topic: "T", date: "2025-06-12" }];
  renderAgenda("user1");
  assert.match(document.querySelector("li").textContent, /Formatted/);
});

//No agenda-list element
test("throws if agenda-list is missing", () => {
  setupDOM();
  get("agenda-list").remove();
  storage.getData = () => [{ topic: "T", date: "2025-06-12" }];
  assert.throws(() => renderAgenda("user1"));
});

//Invalid date
test("handles null date", () => {
  setupDOM();
  storage.getData = () => [{ topic: "Oops", date: null }];
  renderAgenda("user1");
  assert.match(document.querySelector("li").textContent, /Formatted\(null\)/);
});

//Missing topic
test("handles missing topic", () => {
  setupDOM();
  storage.getData = () => [{ date: "2025-06-12" }];
  renderAgenda("user1");
  assert.match(document.querySelector("li").textContent, /undefined – Formatted/);
});

//Toggle clear button
test("shows/hides clear button", () => {
  setupDOM();
  storage.getData = () => [{ topic: "X", date: "2025-07-01" }];
  renderAgenda("user1");
  assert.equal(get("clear-btn").hidden, false);

  storage.getData = () => [];
  renderAgenda("user1");
  assert.equal(get("clear-btn").hidden, true);
});

//Duplicate topics
test("shows duplicate topics", () => {
  setupDOM();
  storage.getData = () => [
    { topic: "Same", date: "2025-06-12" },
    { topic: "Same", date: "2025-06-12" }
  ];
  renderAgenda("user1");
  assert.equal(document.querySelectorAll("li").length, 2);
});
