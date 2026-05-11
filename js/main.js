import { initInteractions } from "./interactions.js";
import { renderPage, renderSiteNav } from "./renderers.js";
import { siteContent } from "./siteContent.js";

const fallbackBackgrounds = {
  home: "img/背景图-主界面.png",
  about: "img/背景图-主界面.png"
};

function resolveBackground(page) {
  const category = siteContent.categories.find((item) => item.slug === page);
  const asset = category?.backgroundImage ?? fallbackBackgrounds[page] ?? fallbackBackgrounds.home;
  return asset.startsWith("/") ? asset : `/${asset}`;
}

function mountPage() {
  const page = document.body.dataset.page ?? "home";
  const navRoot = document.getElementById("siteNav");
  const appRoot = document.getElementById("app");

  if (!navRoot || !appRoot) return;

  navRoot.innerHTML = renderSiteNav(siteContent.navigation, page);
  appRoot.innerHTML = renderPage(page, siteContent);
  document.body.style.setProperty("--page-background", `url("${resolveBackground(page)}")`);
  initInteractions(page, siteContent);
}

mountPage();
