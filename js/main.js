import { getResearchIdFromLocation, initInteractions } from "./interactions.js";
import { renderPage, renderSiteNav } from "./renderers.js";
import { siteContent } from "./siteContentUnified.js";

function mountPage() {
  const page = document.body.dataset.page ?? "home";
  const navRoot = document.getElementById("siteNav");
  const appRoot = document.getElementById("app");

  if (!navRoot || !appRoot) return;

  try {
    navRoot.innerHTML = renderSiteNav(siteContent.navigation, page);
    const researchId = page === "research" ? getResearchIdFromLocation(window.location.href) : null;
    appRoot.innerHTML = renderPage(page, siteContent, researchId);
    initInteractions(page, siteContent);
  } catch (error) {
    // 页面入口必须有兜底，避免单个渲染异常直接把整页打成空白。
    console.error(error);
    appRoot.innerHTML = `
      <section class="reading-section">
        <div class="section-heading">
          <h2>页面加载失败</h2>
          <p>${error instanceof Error ? error.message : "未知错误"}</p>
        </div>
      </section>
    `;
  }
}

mountPage();

