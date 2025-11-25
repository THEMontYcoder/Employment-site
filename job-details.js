// job-details.js
const API_BASE = "https://employment-site.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const jobTitleEl = document.getElementById("job-title");
  const jobCompanyEl = document.getElementById("job-company");
  const jobLocationEl = document.getElementById("job-location");
  const jobTypeEl = document.getElementById("job-type");
  const jobSalaryEl = document.getElementById("job-salary");
  const jobDescriptionEl = document.getElementById("job-description");
  const applyForm = document.getElementById("apply-form");
  const applyMsg = document.getElementById("apply-msg");

  // LocalStorage se job laao
  const stored = localStorage.getItem("selectedJob");
  if (!stored) {
    if (applyMsg) {
      applyMsg.style.color = "red";
      applyMsg.textContent = "No job selected. Please go back to jobs list.";
    }
    return;
  }

  const job = JSON.parse(stored);

  // Job ID resolve karo
  const jobId = job._id || job.id || job.jobId;
  console.log("Job from localStorage:", job);
  console.log("Resolved jobId:", jobId);

  if (!jobId) {
    if (applyMsg) {
      applyMsg.style.color = "red";
      applyMsg.textContent =
        "Job ID missing. Please open this job again from the jobs list.";
    }
    return;
  }

  // UI fill karo
  if (jobTitleEl) jobTitleEl.textContent = job.title || "Untitled Role";
  if (jobCompanyEl) jobCompanyEl.textContent = job.company || "N/A";
  if (jobLocationEl) jobLocationEl.textContent = job.location || "N/A";
  if (jobTypeEl) jobTypeEl.textContent = job.type || "N/A";
  if (jobSalaryEl) jobSalaryEl.textContent = job.salary || "Not disclosed";
  if (jobDescriptionEl) jobDescriptionEl.textContent = job.description || "";

  // Form submit handler
  if (!applyForm) return;

  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("apply-name").value.trim();
    const email = document.getElementById("apply-email").value.trim();
    const resume = document.getElementById("apply-resume").value.trim();
    const coverLetter = document.getElementById("apply-cover").value.trim();

    if (!name || !email || !resume) {
      applyMsg.style.color = "red";
      applyMsg.textContent = "Please fill all required fields.";
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      applyMsg.style.color = "red";
      applyMsg.textContent = "You must be signed in to apply.";
      return;
    }

    try {
      applyMsg.style.color = "black";
      applyMsg.textContent = "Submitting application...";

      const res = await fetch(`${API_BASE}/api/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, resume, coverLetter }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("JSON parse error:", err);
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        console.error("Apply error response:", data);
        throw new Error(data.message || "Failed to apply");
      }

      applyMsg.style.color = "green";
      applyMsg.textContent =
        data.message || "Application submitted successfully!";

    } catch (err) {
      console.error("Apply error:", err);
      applyMsg.style.color = "red";
      applyMsg.textContent = err.message || "Server error, please try again.";
    }
  });
});
