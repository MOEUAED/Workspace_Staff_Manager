# WorkSphere – Interactive Staff Manager

A modern, interactive web application that allows organizations to visually manage staff inside workplace environments using a dynamic floor plan. The application provides real-time placement, validation, and role-based constraints for employees, with a focus on usability, responsive design, and clean architecture.

---

## 🚀 Overview

WorkSphere allows organizations to:

* Visualize and manage personnel in real-time on a floorplan
* Add, move, and remove employees with drag-and-drop
* Apply role-based access rules per room
* Edit and view detailed employee profiles
* Maintain a responsive and professional UI (desktop, tablet, mobile)

---

## 🎯 Objectives

* Add, move, and remove staff members directly on the floorplan.
* Enforce business rules based on employee roles.
* Provide a fluid and modern UI with real-time previsualization.
* Ensure fully responsive design across all devices.
* Save the app state locally using `localStorage`.
* Offer advanced options: search, filtering, editing, auto-assignment, drag-and-drop.

---

## 🧩 Features

**Core Features:**

* Visual floorplan with 6 rooms:
  * Conference Room
  * Reception
  * Server Room
  * Security Room
  * Staff Room
  * Archive Room
* Sidebar with unassigned employees
* Employee modal:
  * Name, Role, Photo URL, Email, Phone
  * Dynamic professional experiences form
* Profile modal with full employee information
* Zone assignment rules & capacity limits

**Advanced Features:**

* Drag & Drop between zones
* Edit employee details
* Search and filter by name or role
* Automatic redistribution following business rules
* Persistent state using `localStorage`

---

## 🧱 Technologies Used

* **HTML5** – semantic structure
* **CSS3** – Flexbox/Grid, responsive design, animations
* **JavaScript (Vanilla)** – dynamic rendering, validation, drag-and-drop
* **LocalStorage API** – persistent state management

---

## 📁 Project Structure

```
root/
│
├── index.html # Main HTML structure
└── assets/
├── img/ # Images, icons, employee photos
├── css/
│ └── styles.css # UI design, layout, animations, responsive queries
└── js/
└── script.js # Dynamic logic: validation, rendering, drag & drop

```

---

---

## 🔀 Git Branches

| Branch | Purpose |
|--------|---------|
| `main` | Merge branch for release |
| `dev` | Default testing branch |
| `structure-web` | Push `README.md` + web structure files |
| `html-structure` | Contains `index.html` |
| `css-styles` | Contains `styles.css` |
| `js-logic` | Contains `script.js` |

**GitHub Repository:** `git@github.com:MOEUAED/Workspace_Staff_Manager.git`

---

## 🧪 Validation & QA

* HTML & CSS validated using **W3C Validator**
* Modular and maintainable JS code
* Responsive behavior verified on multiple devices:
  * Desktop >1280px
  * Small Desktop 1024–1279px
  * Tablet 768–1023px
  * Mobile ≤767px
  * Landscape tablet & mobile supported

## 📦 Deployment

Deployed via **GitHub Pages**.  

---

## 📊 Project Management

Managed with Jira. Recommended workflow:
Recommended columns:

* Columns: Backlog → To Do → In Progress → Review → Testing → Done.
* User stories assigned to feature branches.
* Tasks tracked with priorities and deadlines.

---

## 🎤 Presentation Requirements

* 10 min: Live demo + features
* 10 min: Code review + Q&A
* 20 min: Real use-case scenario

You must present:

* Project structure
* Implementation logic
* UI/UX choices
* Branching strategy
* Deployed version
* Repository & planning links

---

## 📎 Deliverables

* Planning link (Trello/Jira/GitHub Projects)
* GitHub repository link
* Deployment link
* Presentation link (PDF/Google Slides)

---

## 👨‍💻 Author

**Mouad Ziyani** – back-End Developer

