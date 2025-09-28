// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    alert("You searched for: " + query); 
    // 🔹 Later replace this alert with actual search logic
  } else {
    alert("Please enter a keyword to search.");
  }
});


