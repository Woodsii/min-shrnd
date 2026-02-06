/* 
fixi.js has no support for history, here's my fix. 
It's gonna be a lot of event listeners alas.
*/

const routes = {
  "/": "../pages/home.html",
  "/home": "../pages/home.html",
  "/blog": "../pages/blog.html",
  "/projects": "../pages/projects.html",
  "/eclectica": "../pages/eclectica.html",
};

window.addEventListener("popstate", async () => {
  const path = window.location.pathname;
  const fileToLoad = routes[path] || "./pages/home.html";

  try {
    const response = await fetch(fileToLoad);
    if (!response.ok) throw new Error("Page not found");
    const html = await response.text();

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        document.querySelector("#page-content").innerHTML = html;
      });
      await transition.finished;
    } else {
      target.innerHTML = newHtml;
    }
  } catch (error) {
    console.error("Navigation error:", error);
    document.querySelector("#page-content").innerHTML =
      "<h1>404 - Page not found</h1>";
  }
});
