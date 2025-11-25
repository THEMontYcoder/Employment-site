// admin-dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-job-form");
  const statusEl = document.getElementById("admin-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      title: document.getElementById("job-title").value.trim(),
      company: document.getElementById("job-company").value.trim(),
      location: document.getElementById("job-location").value.trim(),
      type: document.getElementById("job-type").value.trim(),
      salary: document.getElementById("job-salary").value.trim(),
      description: document
        .getElementById("job-description")
        .value.trim(),
    };

    console.log("Sending job payload:", payload);

    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/add-job",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();
      console.log("Add job raw response:", text);

      if (!res.ok) {
        statusEl.textContent = "❌ Failed to add job. Status: " + res.status;
        alert("Failed to add job. Status: " + res.status);
        return;
      }

      statusEl.textContent = "✅ Job added successfully!";
      form.reset();
    } catch (err) {
      console.error("Network error while adding job:", err);
      statusEl.textContent = "❌ Network error. Check if backend is running.";
    }
  });
});
