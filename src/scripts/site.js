// 全站交互行为，随 BaseLayout 加载一次，通过 astro:page-load 在每次导航后重新初始化。
// 需要清理的监听器/观察器登记到 cleanups，在 astro:before-swap 统一释放。

const cleanups = [];

function onCleanup(fn) {
  cleanups.push(fn);
}

function runCleanups() {
  while (cleanups.length > 0) {
    try {
      cleanups.pop()();
    } catch {
      // 忽略清理异常
    }
  }
}

const THEME_ORDER = ["system", "light", "dark"];
const THEME_LABELS = { system: "跟随系统", light: "亮色", dark: "暗色" };
const THEME_SHORT_LABELS = { system: "系统", light: "亮色", dark: "暗色" };

function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle");
  if (!(btn instanceof HTMLButtonElement)) return;
  const syncLabel = () => {
    const choice = document.documentElement.dataset.themeChoice || "system";
    btn.setAttribute("aria-label", `主题：${THEME_LABELS[choice]}，点击切换`);
    btn.title = `主题：${THEME_LABELS[choice]}`;
    const text = btn.querySelector(".theme-toggle-text");
    if (text) text.textContent = THEME_SHORT_LABELS[choice];
  };
  syncLabel();
  btn.addEventListener("click", () => {
    const current = document.documentElement.dataset.themeChoice || "system";
    const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
    try {
      localStorage.setItem("theme-choice", next);
    } catch {
      // 隐私模式等场景下静默降级
    }
    window.__applyThemeChoice?.(next);
    syncLabel();
  });
}

function initReveal() {
  const targets = [...document.querySelectorAll("[data-reveal]:not(.revealed)")];
  if (targets.length === 0) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    for (const el of targets) el.classList.add("revealed");
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  for (const el of targets) io.observe(el);
  onCleanup(() => io.disconnect());
}

function initCopyButtons() {
  for (const pre of document.querySelectorAll(".prose pre")) {
    if (pre.querySelector(".copy-code")) continue;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-code";
    btn.textContent = "复制";
    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code");
      const text = (code ?? pre).innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.append(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      btn.textContent = "已复制";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "复制";
        btn.classList.remove("copied");
      }, 1600);
    });
    pre.append(btn);
  }
}

function initLightbox() {
  const images = [...document.querySelectorAll(".prose img")].filter(
    (img) => !img.closest("a"),
  );
  if (images.length === 0) return;
  let overlay = null;
  const close = () => {
    overlay?.remove();
    overlay = null;
    document.body.style.overflow = "";
  };
  const open = (img) => {
    close();
    overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "查看大图");
    const clone = document.createElement("img");
    clone.src = img.currentSrc || img.src;
    clone.alt = img.alt || "";
    overlay.append(clone);
    overlay.addEventListener("click", close);
    document.body.append(overlay);
    document.body.style.overflow = "hidden";
  };
  const onKeydown = (event) => {
    if (event.key === "Escape") close();
  };
  for (const img of images) {
    img.classList.add("zoomable");
    img.addEventListener("click", () => open(img));
  }
  addEventListener("keydown", onKeydown);
  onCleanup(() => {
    removeEventListener("keydown", onKeydown);
    close();
  });
}

function initProgressArc() {
  const shell = document.querySelector(".progress-arc");
  const fill = shell?.querySelector(".fill");
  if (!(shell instanceof HTMLElement) || !fill) return;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.setAttribute("stroke-dasharray", `${(p * 100).toFixed(2)} 100`);
    shell.classList.toggle("visible", p > 0.02);
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
  onCleanup(() => {
    removeEventListener("scroll", update);
    removeEventListener("resize", update);
  });
}

function initTocHighlight() {
  const links = [...document.querySelectorAll(".toc a[href^='#']")];
  if (links.length === 0) return;
  const pairs = [];
  for (const link of links) {
    const id = decodeURIComponent(link.getAttribute("href").slice(1));
    const heading = document.getElementById(id);
    if (heading) pairs.push({ heading, link });
  }
  if (pairs.length === 0) return;
  const update = () => {
    // 用视口坐标判定，避免标题的 offsetParent 变化导致 offsetTop 与 scrollY 坐标系错位
    let current = null;
    for (const pair of pairs) {
      if (pair.heading.getBoundingClientRect().top <= 140) current = pair;
      else break;
    }
    for (const pair of pairs) {
      if (pair === current) pair.link.setAttribute("aria-current", "true");
      else pair.link.removeAttribute("aria-current");
    }
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
  onCleanup(() => {
    removeEventListener("scroll", update);
    removeEventListener("resize", update);
  });
}

function initPage() {
  initThemeToggle();
  initReveal();
  initCopyButtons();
  initLightbox();
  initProgressArc();
  initTocHighlight();
}

document.addEventListener("astro:page-load", initPage);
document.addEventListener("astro:before-swap", runCleanups);
