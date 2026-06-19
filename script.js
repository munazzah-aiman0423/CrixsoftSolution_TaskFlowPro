// ==========================
// TASKFLOW PRO V2
// ==========================

let tasks = JSON.parse(localStorage.getItem("taskflowTasks")) || [

{
id:1,
title:"🚀 Complete Crixsoft Internship Project",
category:"Internship",
priority:"High",
dueDate:"2026-06-25",
completed:false
},

{
id:2,
title:"📌 Submit Weekly Internship Report",
category:"Internship",
priority:"High",
dueDate:"2026-06-24",
completed:false
},

{
id:3,
title:"💻 Build Portfolio Website",
category:"Work",
priority:"Medium",
dueDate:"2026-06-28",
completed:false
},

{
id:4,
title:"📚 Learn Advanced JavaScript",
category:"Study",
priority:"Low",
dueDate:"2026-06-30",
completed:false
},

{
id:5,
title:"🌐 Upload Project To GitHub",
category:"Work",
priority:"High",
dueDate:"2026-06-22",
completed:true
},

{
id:6,
title:"🎥 Record Demo Video",
category:"Personal",
priority:"Medium",
dueDate:"2026-06-26",
completed:false
},

{
id:7,
title:"📝 Update Resume",
category:"Personal",
priority:"Medium",
dueDate:"2026-06-27",
completed:false
},

{
id:8,
title:"💼 Apply For New Internship",
category:"Internship",
priority:"High",
dueDate:"2026-07-01",
completed:false
}

];

let currentFilter = "all";

// ==========================
// DOM ELEMENTS
// ==========================

const taskList =
document.getElementById("taskList");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskInput =
document.getElementById("taskInput");

const categoryInput =
document.getElementById("category");

const priorityInput =
document.getElementById("priority");

const dueDateInput =
document.getElementById("dueDate");

const searchInput =
document.getElementById("searchInput");

const themeToggle =
document.getElementById("themeToggle");

const emptyState =
document.getElementById("emptyState");

// ==========================
// INIT
// ==========================

renderTasks();

// ==========================
// ADD TASK
// ==========================

addTaskBtn.addEventListener(
"click",
addTask
);

function addTask(){

const title =
taskInput.value.trim();

if(title===""){

showToast(
"⚠ Please enter a task"
);

return;
}

const task = {

id:Date.now(),

title,

category:
categoryInput.value,

priority:
priorityInput.value,

dueDate:
dueDateInput.value ||

new Date()
.toISOString()
.split("T")[0],

completed:false

};

tasks.unshift(task);

saveTasks();

taskInput.value="";
dueDateInput.value="";

showToast(
"✅ Task Added Successfully"
);

}

// ==========================
// SAVE
// ==========================

function saveTasks(){

localStorage.setItem(
"taskflowTasks",
JSON.stringify(tasks)
);

renderTasks();

}

// ==========================
// RENDER
// ==========================

function renderTasks(){

taskList.innerHTML="";

let filteredTasks = [...tasks];

if(currentFilter==="active"){

filteredTasks =
filteredTasks.filter(
task=>!task.completed
);

}

if(currentFilter==="completed"){

filteredTasks =
filteredTasks.filter(
task=>task.completed
);

}

const search =
searchInput.value
.toLowerCase();

filteredTasks =
filteredTasks.filter(task =>

task.title
.toLowerCase()
.includes(search)

);

if(filteredTasks.length===0){

emptyState.style.display=
"block";

}else{

emptyState.style.display=
"none";

}

filteredTasks.forEach(task=>{

const taskElement =
document.createElement("div");

taskElement.className =
"task";

taskElement.innerHTML = `

<div class="task-info">

<div class="task-title
${task.completed ? "completed" : ""}
">

${task.title}

</div>

<div class="meta">

<span class="badge category">

${task.category}

</span>

<span class="badge
${task.priority.toLowerCase()}
">

${task.priority}

</span>

<span class="badge ${getDateStatus(task.dueDate)}">

📅 ${task.dueDate}

</span>

</div>

</div>

<div class="actions">

<button
class="complete-btn"
onclick="toggleTask(${task.id})">

${task.completed ? "↺" : "✓"}

</button>

<button
class="delete-btn"
onclick="deleteTask(${task.id})">

✕
</button>

</div>

`;

taskList.appendChild(
taskElement
);

});

updateStats();

}

// ==========================
// COMPLETE
// ==========================

function toggleTask(id){

tasks = tasks.map(task =>

task.id===id

?

{
...task,
completed:!task.completed
}

:

task

);

saveTasks();

showToast(
"🎉 Task Updated"
);

}

// ==========================
// DELETE
// ==========================

function deleteTask(id){

const confirmDelete = confirm(
"Are you sure you want to delete this task?"
);

if(!confirmDelete){
return;
}

tasks = tasks.filter(
task => task.id !== id
);

saveTasks();

showToast(
"🗑 Task Deleted"
);

}

// ==========================
// STATS
// ==========================

function updateStats(){

const total =
tasks.length;

const completed =
tasks.filter(
task=>task.completed
).length;

const pending =
total-completed;

document.getElementById(
"totalTasks"
).innerText = total;

document.getElementById(
"completedTasks"
).innerText = completed;

document.getElementById(
"pendingTasks"
).innerText = pending;

document.getElementById(
"taskSummary"
).innerText =
`${total} Tasks • ${completed} Completed`;

const percentage =

total===0

? 0

: Math.round(
(completed/total)*100
);

document.getElementById(
"progressFill"
).style.width =
percentage+"%";

document.getElementById(
"progressText"
).innerText =
percentage+"% Completed";

document.getElementById(
"circlePercentage"
).innerText =
percentage+"%";

}

// ==========================
// FILTERS
// ==========================

document
.querySelectorAll(".filter-btn")
.forEach(button=>{

button.addEventListener(
"click",
()=>{

document
.querySelectorAll(
".filter-btn"
)
.forEach(btn=>

btn.classList.remove(
"active"
)

);

button.classList.add(
"active"
);

currentFilter =
button.dataset.filter;

renderTasks();

});

});

// ==========================
// SEARCH
// ==========================

searchInput.addEventListener(
"keyup",
renderTasks
);

// ==========================
// THEME TOGGLE
// ==========================

themeToggle.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"light"
);

const isLight =

document.body.classList.contains(
"light"
);

themeToggle.innerText =

isLight

? "☀️"

: "🌙";

localStorage.setItem(
"theme",
isLight
? "light"
: "dark"
);

}
);

// Load Theme

if(
localStorage.getItem("theme")
==="light"
){

document.body.classList.add(
"light"
);

themeToggle.innerText="☀️";

}

// ==========================
// TOAST
// ==========================

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText =
message;

toast.style.opacity="1";

setTimeout(()=>{

toast.style.opacity="0";

},2500);

}

function getDateStatus(date){

const today =
new Date();

today.setHours(0,0,0,0);

const due =
new Date(date);

due.setHours(0,0,0,0);

if(due < today){
return "overdue";
}

if(due.getTime() === today.getTime()){
return "today";
}

return "upcoming";
}