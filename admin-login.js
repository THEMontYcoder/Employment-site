const form = document.getElementById("admin-login-form");
const msg = document.getElementById("admin-login-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("admin-email").value.trim();
  const password = document
    .getElementById("admin-password")
    .value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      msg.textContent = data.message || "Login failed";
      msg.style.color = "red";
      return;
    }

    const data = await res.json();
    localStorage.setItem("adminToken", data.token);
    msg.textContent = "Login successful, redirecting...";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 500);
  } catch (err) {
    console.error(err);
    msg.textContent = "Network error.";
    msg.style.color = "red";
  }
});
