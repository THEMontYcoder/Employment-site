// script.js

let allJobs = []; // sab jobs ko memory me rakhne ke liye

// API se jobs laao
async function loadJobs() {
  try {
    console.log("Loading jobs...");

    const res = await fetch("http://localhost:5000/api/jobs");
    console.log("Response status:", res.status);

    const jobs = await res.json();
    console.log("Jobs from API:", jobs);

    allJobs = jobs;        // global list save
    renderJobs(allJobs);   // pehli baar sab dikhado
  } catch (err) {
    console.error("Failed to load jobs", err);
  }
}

// Jobs ko page par dikhane wala function
function renderJobs(jobs) {
  const list = document.getElementById("jobs-list");
  if (!list) return;

  list.innerHTML = "";

  if (jobs.length === 0) {
    list.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  jobs.forEach((job) => {
    const item = document.createElement("div");
    item.className = "job-card";
    item.innerHTML = `
      <h3>${job.title}</h3>
      <p><b>Company:</b> ${job.company}</p>
      <p><b>Location:</b> ${job.location}</p>
      <p>${job.description || ""}</p>
    `;
    list.appendChild(item);
  });
}

// Search setup
function setupSearch() {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");

  if (!input || !btn) return;

  const doSearch = () => {
    const q = input.value.trim().toLowerCase();

    if (!q) {
      renderJobs(allJobs); // empty search → sab dikhao
      return;
    }

    const filtered = allJobs.filter((job) => {
      const text = (
        `${job.title} ${job.company} ${job.location} ${job.description || ""}`
      ).toLowerCase();
      return text.includes(q);
    });

    renderJobs(filtered);
  };

  btn.addEventListener("click", doSearch);

  // Enter key se bhi search
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      doSearch();
    }
  });
}

// Mobile menu (hamburger) toggle
function setupMenu() {
  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Sab kuch DOM ready hone ke baad run karein
document.addEventListener("DOMContentLoaded", () => {
  loadJobs();
  setupSearch();
  setupMenu();
});
