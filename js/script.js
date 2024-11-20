// モバイルメニュー
const hamburger = document.querySelector(".hamburger");
const closeIconWrap = document.querySelector(".close-icon__wrap");
const nav = document.querySelector(".nav");
const mask = document.querySelector(".mask");
const logo = document.querySelector(".logo__image");

// メニューを開く関数
function openMenu() {
  closeIconWrap.style.display = "block";
  nav.style.display = "block";
  hamburger.style.display = "none";
  mask.style.display = "block";
  logo.style.opacity = "0.7";
}

// メニューを閉じる関数
function closeMenu() {
  nav.style.display = "none";
  hamburger.style.display = "block";
  closeIconWrap.style.display = "none";
  mask.style.display = "none";
  logo.style.opacity = "1";
}

// イベント設定
hamburger.addEventListener("click", openMenu);
closeIconWrap.addEventListener("click", closeMenu);
mask.addEventListener("click", closeMenu);

// リサイズ時のdisplayリセット
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1200) {
    hamburger.style.display = "";
    closeIconWrap.style.display = "";
    nav.style.display = "";
    mask.style.display = "";
    logo.style.opacity = "";
  }
});

// FAQアコーディオン
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item) => {
    const checkbox = item.querySelector(".faq__checkbox");
    const question = item.querySelector(".faq__question");
    question.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = item.classList.toggle("faq__item--open");
      checkbox.checked = isOpen;
    });
  });
});

// INTRO テキスト出現アニメーション
(function () {
  function createAnimatedText(text) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < text.length; i++) {
      const charContainer = document.createElement("span");
      charContainer.classList.add("char-container");

      const charBg = document.createElement("span");
      charBg.classList.add("char-bg");
      charBg.setAttribute("aria-hidden", "true");

      const char = document.createElement("span");
      char.textContent = text[i];
      char.classList.add("char");

      charContainer.appendChild(charBg);
      charContainer.appendChild(char);
      fragment.appendChild(charContainer);
    }

    return fragment;
  }

  function animateText(element, delay = 0) {
    return new Promise((resolve) => {
      if (!element || element.dataset.animated === "true") {
        resolve();
        return;
      }

      element.style.opacity = "1";

      const originalText = element.textContent;
      element.textContent = "";
      element.appendChild(createAnimatedText(originalText));
      element.dataset.animated = "true";

      let charDelay = delay;
      const chars = element.querySelectorAll(".char-container");
      chars.forEach((charContainer) => {
        const charBg = charContainer.querySelector(".char-bg");
        const char = charContainer.querySelector(".char");
        setTimeout(() => {
          charBg.style.transform = "scaleX(1)";
          char.style.opacity = "1";
        }, charDelay);
        charDelay += 30;
      });

      setTimeout(resolve, charDelay + 200);
    });
  }

  async function animateItems(parent) {
    let childItems;
    if (parent.classList.contains("concerns")) {
      childItems = parent.querySelectorAll(".concerns__item span");
    } else if (parent.classList.contains("about__catchphrase")) {
      childItems = parent.querySelectorAll(".highlight--main, .highlight--sub");
    } else {
      childItems = parent.querySelectorAll(".highlight--sub.bold, .highlight--main, .highlight--sub");
    }

    let delay = 0;

    for (const item of childItems) {
      await animateText(item, delay);
      delay += 30;
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateItems(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "10% 0px -40% 0px",
    }
  );

  const targets = document.querySelectorAll(".about__catchphrase, .concerns, .service__list, .support__item");
  targets.forEach((target) => {
    if (target) {
      observer.observe(target);
    }
  });
})();