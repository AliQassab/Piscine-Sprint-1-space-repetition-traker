// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIDs } from "./data/common.mjs";
import { getRevisionDates } from "./date/revision.mjs";
import { addData, clearData } from "./data/storage.mjs";
import { renderAgenda } from "./agenda/agenda.mjs";

window.onload = function () {
  const dateInput = document.getElementById("topic-date");
  const form = document.getElementById("topic-form");
  const selectUser = document.getElementById("user-select");
  if (!selectUser || !dateInput || !form) return;
  dateInput.valueAsDate = new Date(); // defaults to today

  const users = getUserIDs();
  renderAgenda(selectUser.value);
  users.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.text = `user-${id}`;
    selectUser.add(option);
  });

  selectUser.addEventListener("change", () => {
    const userId = selectUser.value;
    renderAgenda(userId);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = selectUser.value;
    if (!userId) return alert("Please select a User!"); // no user selected

    const topic = document.getElementById("topic-name").value.trim();
    const startDate = dateInput.value;
    if (!topic || !startDate) return;

    const repetitionDates = getRevisionDates(startDate, topic);

    addData(userId, repetitionDates);
    renderAgenda(userId);
    form.reset();
    dateInput.valueAsDate = new Date();
  });

  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", () => {
    const userId = selectUser.value;
    if (confirm("Clear all data for this user?")) {
      // Clear the stored data for the selected user
      clearData(userId);

      // Update the agenda display to reflect cleared data
      renderAgenda(userId);
    }
  });
};
