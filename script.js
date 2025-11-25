// script.js

// Global array to store all jobs from API
let allJobs = [];

// Simple toast helper (used by many pages)
function showToast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  if (type === "success") toast.classList.add("toast-success");
  else if (type === "error") toast.classList.add("toast-error");
  else toast.classList.add("toast-info");

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    if (!container.children.length) container.remove();
  }, 3000);
}

// Render jobs on the page
function renderJobs(jobs) {
  const list = document.getElementById("jobs-list");
  if (!list) return; // safety

  list.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No jobs found.";
    list.appendChild(empty);
    return;
  }

  jobs.forEach((job) => {
    const item = document.createElement("div");
    item.className = "job-card";
    item.innerHTML = `
      <h3>${job.title || "Untitled Role"}</h3>
      <p><b>Company:</b> ${job.company || "N/A"}</p>
      <p><b>Location:</b> ${job.location || "N/A"}</p>
      <p><b>Type:</b> ${job.type || "N/A"}</p>
      <p><b>Salary:</b> ${job.salary || "Not disclosed"}</p>
      <p class="job-description">${job.description || ""}</p>
      <button class="view-details-btn">View Details</button>
    `;

    const btn = item.querySelector(".view-details-btn");
    btn.addEventListener("click", () => {
      localStorage.setItem("selectedJob", JSON.stringify(job));
      window.location.href = "job-details.html";
    });

    list.appendChild(item);
  });
}

// Load jobs from backend API
async function loadJobs() {
  try {
    const res = await fetch("https://employment-site.onrender.com/api/jobs");

    allJobs = await res.json();
    renderJobs(allJobs);
  } catch (err) {
    console.error("Failed to load jobs", err);
    const list = document.getElementById("jobs-list");
    if (list) {
      list.innerHTML = "<p>Failed to load jobs. Please try again later.</p>";
    }
  }
}

// Filter jobs according to search query
function filterJobs(query) {
  if (!allJobs || allJobs.length === 0) return;

  const q = query.trim().toLowerCase();
  if (!q) {
    renderJobs(allJobs);
    return;
  }

  const filtered = allJobs.filter((job) => {
    const title = (job.title || "").toLowerCase();
    const company = (job.company || "").toLowerCase();
    const location = (job.location || "").toLowerCase();
    const description = (job.description || "").toLowerCase();

    return (
      title.includes(q) ||
      company.includes(q) ||
      location.includes(q) ||
      description.includes(q)
    );
  });

  renderJobs(filtered);
}

// Setup search input + button
function setupSearch() {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");

  if (!input || !btn) return;

  btn.addEventListener("click", () => {
    filterJobs(input.value);
  });

  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      filterJobs(input.value);
    }
  });
}

// Mobile menu toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Auth UI + Logout setup
function setupAuthUI() {
  let user = null;
  const userJSON = localStorage.getItem("user");
  try {
    user = userJSON ? JSON.parse(userJSON) : null;
  } catch (e) {
    user = null;
  }

  const guestElems = document.querySelectorAll(".nav-guest");
  const userElems = document.querySelectorAll(".nav-user");
  const userGreeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  if (user) {
    guestElems.forEach((el) => (el.style.display = "none"));
    userElems.forEach((el) => (el.style.display = "inline-block"));

    if (userGreeting) {
      const name = user.name || user.fullName || user.email || "User";
      userGreeting.textContent = `Hi, ${name}`;
    }
  } else {
    guestElems.forEach((el) => (el.style.display = "inline-block"));
    userElems.forEach((el) => (el.style.display = "none"));
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showToast("Logged out", "info");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    });
  }
}

// Initialise
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupAuthUI();

  if (document.getElementById("jobs-list")) {
    loadJobs();
  }
  if (document.getElementById("search-input") && document.getElementById("search-btn")) {
    setupSearch();
  }
});

// make toast globally available
window.showToast = showToast;
