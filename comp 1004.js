// ===============================
// SPA NAVIGATION
// ===============================
const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        pages.forEach(page => page.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});

//Active Nav Buttons 

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        pages.forEach(page => page.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});







// ===============================
// ASSIGNMENT MANAGER
// ===============================
const form = document.getElementById("assignment-form");
const list = document.getElementById("assignment-list");

// Add assignment to UI
function addAssignmentToList(assignment) {
    const li = document.createElement("li");
    li.textContent = `${assignment.title} — Due: ${assignment.date}`;
    list.appendChild(li);
}

// Load saved assignments
function loadAssignments() {
    const saved = JSON.parse(localStorage.getItem("assignments") || "[]");

    saved.forEach(assignment => {
        addAssignmentToList(assignment);
    });

    updateNextAssignment();
    updateUpcomingAssignments();
}

// Save new assignment
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("assignment-title").value;
    const date = document.getElementById("assignment-date").value;

    const assignment = { title, date };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("assignments") || "[]");
    saved.push(assignment);
    localStorage.setItem("assignments", JSON.stringify(saved));

    // Add to UI
    addAssignmentToList(assignment);

    form.reset();

    updateNextAssignment();
    updateUpcomingAssignments();
});

// ===============================
// NEXT ASSIGNMENT PREVIEW
// ===============================
const nextAssignmentElement = document.getElementById("next-assignment");

function updateNextAssignment() {
    const items = document.querySelectorAll("#assignment-list li");

    if (items.length === 0) {
        nextAssignmentElement.textContent = "No assignments yet.";
        return;
    }

    nextAssignmentElement.textContent = items[0].textContent;
}

// ===============================
// UPCOMING ASSIGNMENTS (Next 3 Weeks)
// ===============================
const upcomingList = document.getElementById("upcoming-assignments");

function updateUpcomingAssignments() {
    const items = document.querySelectorAll("#assignment-list li");
    upcomingList.innerHTML = "";

    if (items.length === 0) {
        upcomingList.innerHTML = "<li>No assignments added yet.</li>";
        return;
    }

    const today = new Date();
    const threeWeeksFromNow = new Date();
    threeWeeksFromNow.setDate(today.getDate() + 21);

    const upcoming = [];

    items.forEach(item => {
        const text = item.textContent;
        const dateMatch = text.match(/Due: (.+)$/);

        if (!dateMatch) return;

        const dueDate = new Date(dateMatch[1]);

        if (dueDate >= today && dueDate <= threeWeeksFromNow) {
            upcoming.push({
                title: text.split(" — ")[0],
                due: dueDate
            });
        }
    });

    if (upcoming.length === 0) {
        upcomingList.innerHTML = "<li>No assignments due in the next 3 weeks.</li>";
        return;
    }

    upcoming.sort((a, b) => a.due - b.due);

    upcoming.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("timetable-item");
        li.textContent = `${item.title} — Due: ${item.due.toLocaleDateString("en-GB")}`;
        upcomingList.appendChild(li);
    });
}

// ===============================
// FULL TIMETABLE
// ===============================
const timetableData = [
    { day: "Monday", module: "Web Development", time: "10:00" },
    { day: "Tuesday", module: "Databases", time: "14:00" },
    { day: "Friday", module: "Networking", time: "09:00" }
];

const timetableContainer = document.getElementById("timetable-container");

function loadFullTimetable() {
    timetableContainer.innerHTML = "";

    timetableData.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("timetable-item");
        div.textContent = `${item.day}: ${item.module} at ${item.time}`;
        timetableContainer.appendChild(div);
    });
}


const nextLectureElement = document.getElementById("next-lecture");

function loadNextLecture() {
    const today = new Date();
    const todayIndex = today.getDay(); // 0 = Sunday, 1 = Monday...

    // Convert timetable days to numbers
    const dayToIndex = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 0
    };

    // Convert timetable into numeric days
    const timetableWithIndex = timetableData.map(item => ({
        ...item,
        index: dayToIndex[item.day]
    }));

    // Find next lecture after today
    let next = timetableWithIndex.find(item => item.index > todayIndex);

    // If none left this week → wrap to next week
    if (!next) {
        next = timetableWithIndex[0];
    }

    nextLectureElement.textContent = `${next.day}: ${next.module} at ${next.time}`;
}


// ===============================
// TODAY'S TIMETABLE PREVIEW
// ===============================
const homeTimetable = document.getElementById("home-timetable");

function loadTodayTimetable() {
    const todayName = new Date().toLocaleDateString("en-GB", { weekday: "long" });

    const todayClasses = timetableData.filter(item => item.day === todayName);

    homeTimetable.innerHTML = "";

    if (todayClasses.length === 0) {
        homeTimetable.textContent = "No classes today.";
        return;
    }

    todayClasses.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("timetable-item");
        div.textContent = `${item.module} at ${item.time}`;
        homeTimetable.appendChild(div);
    });
}

// ===============================
// LOAD EVERYTHING AFTER DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadAssignments();
    loadFullTimetable();
    loadTodayTimetable();
    loadNextLecture();
});


