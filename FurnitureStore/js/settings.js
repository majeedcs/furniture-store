const theme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", theme);

const toggle = document.getElementById("theme-toggle");
if (toggle) {
  toggle.checked = theme === "dark";
  toggle.addEventListener("change", () => {
    const newTheme = toggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}