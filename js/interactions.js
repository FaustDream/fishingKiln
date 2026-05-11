function activateTab(buttons, panels, target) {
  buttons.forEach((button) => {
    const selected = button.dataset.tabTarget === target;
    button.setAttribute("aria-selected", String(selected));
  });

  panels.forEach((panel) => {
    const active = panel.dataset.tabPanel === target;
    panel.hidden = !active;
  });
}

function initTabGroups() {
  const groups = [...document.querySelectorAll(".tab-group")];
  groups.forEach((group) => {
    const buttons = [...group.querySelectorAll(".tab-button")];
    const panels = [...group.querySelectorAll(".tab-panel")];

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activateTab(buttons, panels, button.dataset.tabTarget);
      });
    });
  });
}

function initProcessSteps() {
  const buttons = [...document.querySelectorAll(".process-step")];
  const panels = [...document.querySelectorAll(".process-panel")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.stepIndex;
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      panels.forEach((panel) => {
        const active = panel.dataset.processPanel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });
}

function openResearchDialog(item) {
  const dialog = document.getElementById("researchDialog");
  if (!dialog || !item) return;

  dialog.querySelector("[data-dialog-title]").textContent = item.title;
  dialog.querySelector("[data-dialog-summary]").textContent = item.summary;
  dialog.querySelector("[data-dialog-source]").href = item.sourceUrl;
  dialog.querySelector("[data-dialog-source]").textContent = item.sourceName;
  dialog.querySelector("[data-dialog-image]").src = item.imagePath;
  dialog.querySelector("[data-dialog-image]").alt = item.title;
  dialog.showModal();
}

function initResearchLinks(researchItems) {
  const lookup = new Map(researchItems.map((item) => [item.id, item]));
  document.querySelectorAll("[data-research-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openResearchDialog(lookup.get(button.dataset.researchId));
    });
  });

  document.getElementById("researchDialogClose")?.addEventListener("click", () => {
    document.getElementById("researchDialog")?.close();
  });
}

export function buildCategoryLookup(categories) {
  return new Map(categories.map((item) => [item.slug, item]));
}

export function initInteractions(page, siteContent) {
  initTabGroups();
  initProcessSteps();
  initResearchLinks(siteContent.research.items);
  buildCategoryLookup(siteContent.categories).get(page);
}
