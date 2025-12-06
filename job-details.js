// job-details.js

const API_BASE = "https://employment-site.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  // 1. LocalStorage se job data nikaalo
  const raw = localStorage.getItem("selectedJob");
  const jobTitleEl = document.getElementById("job-title");
  const jobCompanyEl = document.getElementById("job-company");
  const jobLocationEl = document.getElementById("job-location");
  const jobTypeEl = document.getElementById("job-type");
  const jobSalaryEl = document.getElementById("job-salary");
  const jobDescEl = document.getElementById("job-description");

  const msgEl = document.getElementById("apply-message");
  const form = document.getElementById("apply-form");

  if (!raw) {
    if (msgEl) {
      msgEl.textContent = "No job data found. Please go back and select a job again.";
      msgEl.style.color = "red";
    }
    return;
  }

  let job;
  try {
    job = JSON.parse(raw);
  } catch (err) {
    console.error("Error parsing selectedJob from localStorage:", err);
    if (msgEl) {
      msgEl.textContent = "Invalid job data. Please go back and select a job again.";
      msgEl.style.color = "red";
    }
    return;
  }

  // Job ka ID resolve karo (Mongo _id / normal id / custom field)
  const jobId = job._id || job.id || job.jobId || job.jobID || job.job_id;
  console.log("Resolved jobId:", jobId, job);

  // 2. Page par job details fill karo
  if (jobTitleEl) jobTitleEl.textContent = job.title || "Untitled role";
  if (jobCompanyEl) jobCompanyEl.textContent = job.company || "N/A";
  if (jobLocationEl) jobLocationEl.textContent = job.location || "N/A";
  if (jobTypeEl) jobTypeEl.textContent = job.type || "N/A";
  if (jobSalaryEl) jobSalaryEl.textContent = job.salary || "Not disclosed";
  if (jobDescEl) jobDescEl.textContent = job.description || "";

  // 3. Form submit handler
  if (!form) {
    console.warn("apply-form not found in DOM");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!jobId) {
      msgEl.textContent = "Missing job id, please go back and open the job again.";
      msgEl.style.color = "red";
      return;
    }

    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const resume = document.getElementById("resume").value.trim();
    const coverLetter = document.getElementById("cover-letter").value.trim();

    if (!name || !email || !resume) {
      msgEl.textContent = "Name, email and resume are required.";
      msgEl.style.color = "red";
      return;
    }

    msgEl.textContent = "Submitting...";
    msgEl.style.color = "black";

    const payload = { name, email, resume, coverLetter };

    try {
      const url = `${API_BASE}/api/apply/${jobId}`;
      console.log("POST", url, payload);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Apply response status:", res.status);

      // Response ko pehle text lo, phir try-catch se JSON banao
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Response is not valid JSON:", text);
        throw new Error("Invalid JSON from server");
      }

      if (!res.ok) {
        msgEl.textContent =
          data.message || "Server error while applying for job";
        msgEl.style.color = "red";
        return;
      }

      msgEl.textContent = data.message || "Application submitted successfully!";
      msgEl.style.color = "green";
      form.reset();
    } catch (err) {
      console.error("Apply error:", err);
      msgEl.textContent = "Server error while applying for job";
      msgEl.style.color = "red";
    }
  });
});
