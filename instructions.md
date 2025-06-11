# 🧭 Internal Team Instructions – Spaced Repetition Tracker

Welcome, team! This document outlines **how we will work together** on this project. Please read everything carefully before writing or pushing any code.

---

## 🧑‍💻 Team Roles

We have three team members. Each person will take responsibility for one or more files:

| Team Member    | Responsibilities                                               |
| -------------- | -------------------------------------------------------------- |
| **Ali Qassab** | `script.mjs`, `common.test.mjs`, `coordination`, `Instruction` |
| **Chi**        | `revision.mjs`, `utils.mjs`                                    |
| **Mikiyas**    | `agenda.mjs`, `common.test.mjs`, `html`                        |

> ✅ We will confirm or update these responsibilities in our first team meeting.

---

## 📁 Project File Overview

Each file/module has a clear purpose. Please follow the descriptions below:

### `index.html`

* Defines the HTML structure (form, dropdown, output container).
* No need to write any CSS.

### `script.mjs`

```js
// Handles DOMContentLoaded
// Binds event listeners to the form, dropdown, and clear button
// Delegates rendering and data logic to other modules
```

### `agenda.mjs`

```js
// Renders the revision agenda to the page
// Sorts and displays upcoming topics for a selected user
// Shows helpful messages if there are no topics or no user selected
// Uses formatDate() to display dates nicely
```

### `revision.mjs`

```js
// Adds new revision topics
// Validates input data from the form
// Saves the topic to local storage using storage helpers
// May trigger re-rendering of the agenda after saving
```

### `utils.mjs`

```js
// Contains helper functions like formatDate()
// formatDate() converts date strings into readable formats (e.g., Jan 1, 2025)
```

### `storage.mjs`

```js
// Handles reading and writing data to localStorage
// Stores revision topics by userId
// Exports functions like getData(userId) and saveData(userId, data)
```

### `common.test.mjs`

```js
// Contains shared test functions or setups
// Can be reused in different test files (e.g., for agenda, revision modules)
```