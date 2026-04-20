# Comp1004-Project
🏫 UniHub — Single Page Application (SPA)
UniHub is a simple, responsive single‑page application built to help university students manage their academic life in one place.
It combines assignments, timetables, and daily reminders into a clean, dynamic interface that updates instantly — no page reloads required.

🚀 Features
Dashboard Overview — shows today’s date, next class, and upcoming assignment

Assignments Manager — add, view, and track assignments with due dates

Timetable Viewer — displays weekly schedule dynamically

Instant Navigation — switch between sections smoothly using JavaScript

Live Previews — next class and next assignment update automatically

🧠 How It Works
UniHub uses vanilla JavaScript to handle navigation and dynamic content updates.
Each section (Dashboard, Assignments, Timetable) is part of the same HTML page — the app simply hides and shows content using CSS classes.

Navigation buttons trigger dataset.target to switch active pages

Assignments are added directly to the DOM and stored temporarily

Timetable data is generated from a local JavaScript array

Previews are updated automatically whenever new data is added

This approach keeps the app lightweight, fast, and easy to maintain.

🧩 Technologies Used
Layer	Tools
Front‑End	HTML5, CSS3, JavaScript
Architecture	Single‑Page Application (SPA)
Design	Responsive layout, modular components


📂 Project Structure
Code
UniHub/
│
├── index.html          # Main page
├── style.css           # Styling and layout
├── app.js              # Core logic and dynamic updates
└── assets/             # Icons, images, and other resources
💡 Why UniHub?
University life can be chaotic — deadlines, classes, and tasks scattered across platforms.
UniHub brings everything together in one simple hub, helping students stay organised and focused.

🧪 Future Improvements
Add persistent storage (localStorage or database)

Integrate real‑time notifications

Add user authentication and profiles

Expand timetable editing features

👨‍💻 Author
Created by: Corbie
Project Type: Academic / Student Project
Purpose: Demonstrate SPA architecture and front‑end development principles

📜 License
This project is open for educational and non‑commercial use.
Feel free to fork, modify, and learn from it.
