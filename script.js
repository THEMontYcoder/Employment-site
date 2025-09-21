// Sample job suggestions
const jobs = [
  "Software Engineer",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Digital Marketing Specialist",
  "Sales Manager",
  "Financial Analyst",
  "Graphic Designer",
  "Data Scientist",
  "Project Manager"
];

const input = document.getElementById("search-input");
const suggestions = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  suggestions.innerHTML = "";

  if (value === "") {
    suggestions.style.display = "none";
    return;
  }

  const filtered = jobs.filter(job => job.toLowerCase().includes(value));
  filtered.forEach(job => {
    const li = document.createElement("li");
    li.textContent = job;
    li.addEventListener("click", () => {
      input.value = job;
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
    });
    suggestions.appendChild(li);
  });

  suggestions.style.display = filtered.length ? "block" : "none";
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!input.contains(e.target)) {
    suggestions.style.display = "none";
  }
});
