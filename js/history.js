const routes = {
  "": "./pages/home.html", // Default (no hash)
  home: "./pages/home.html",
  blog: "./pages/blog.html",
  projects: "./pages/projects.html",
  eclectica: "./pages/eclectica.html",
};

async function router() {
  const hash = window.location.hash.replace("#", "") || "home";

  const fileToLoad = routes[hash] || "./pages/home.html";

  const container = document.querySelector("#page-content");
  try {
    const response = await fetch(fileToLoad);
    if (!response.ok) throw new Error("Page not found");
    container.innerHTML = await response.text();
  } catch (error) {
    container.innerHTML = "<h1>404 - Page not found</h1>";
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
