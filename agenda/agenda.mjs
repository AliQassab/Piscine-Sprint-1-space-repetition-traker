// Renders the revision schedule to the page
// Sorts and filters upcoming revisions
// Calls formatDate() from utils.mjs
import { getData } from "../data/storage.mjs";
import { formatDate } from "../date/utils.mjs";

//renderAgenda function to show the revision topics for a specific user
export function renderAgenda(userId) {
  const data = getData(userId) || []; //get saved revision data for selected user.

  //references 
  const list = document.getElementById("agenda-list"); // the <ul> list
  const noAgendaMsg = document.getElementById("no-agenda-msg");
  const clearBtn = document.getElementById("clear-btn");

  //here i clear the agenda messages
  noAgendaMsg.innerHTML='';
  list.innerHTML = ""; // Clear existing list

  //if no user is selected just show a message to select a user and stop
  if(!userId){
    noAgendaMsg.innerHTML = "<p>Select a User to add a Topic!</p>";
    return;
  }

  //if the user has no topic to revise show no topic message and hide the clear button
  if(data.length === 0){
    noAgendaMsg.innerHTML = "<p>No Topics to Revise.</p>";
    clearBtn.hidden=true;
    return;
  }
  
  //sort the topics by date.
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  //loop over each topic and add it to the list
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.topic} – ${formatDate(item.date)}`;
    li.classList.add("agenda-item");
    list.appendChild(li);
    
  });

  
}
