// SPA Navigation
const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        document.getElementById(target).classList.add("active");
    });
});

// Assignment Manager
const form = document.getElementById("assignment-form");
const list = document.getElementById("assignment-list");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("assignment-title").value;
    const date = document.getElementById("assignment-date").value;

    const li = document.createElement("li");
    li.textContent = `${title} — Due: ${date}`;

    list.appendChild(li);

    form.reset();
});

// Example Timetable Data
const timetableData = [
    { day: "Monday", module: "Web Development", time: "10:00" },
    { day: "Tuesday", module: "Databases", time: "14:00" },
    { day: "Friday", module: "Networking", time: "09:00" }
];

const timetableContainer = document.getElementById("timetable-container");

timetableData.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("timetable-item");
    div.textContent = `${item.day}: ${item.module} at ${item.time}`;
    timetableContainer.appendChild(div);
});


// HOME PAGE TIMETABLE PREVIEW
const homeTimetable = document.getElementById("home-timetable");

function loadTodayTimetable() {
    const todayName = new Date().toLocaleDateString("en-GB", { weekday: "long" });

    const todayClasses = timetableData.filter(item => item.day === todayName);

    homeTimetable.innerHTML = ""; // clear old content

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

loadTodayTimetable();
