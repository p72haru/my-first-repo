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

// テキスト出現アニメーション
(function() {
  const concernsList = document.querySelector('.concerns__lists');
  const items = document.querySelectorAll('.concerns__item span');
  
  function animateItems() {
    let delay = 0;
    
    items.forEach((item) => {
      const text = item.textContent;
      item.textContent = '';
      
      for (let i = 0; i < text.length; i++) {
        const charContainer = document.createElement('span');
        charContainer.classList.add('char-container');
        
        const charBg = document.createElement('span');
        charBg.classList.add('char-bg');
        charBg.setAttribute('aria-hidden', 'true');
        
        const char = document.createElement('span');
        char.textContent = text[i];
        char.classList.add('char');
        
        charContainer.appendChild(charBg);
        charContainer.appendChild(char);
        item.appendChild(charContainer);
        
        setTimeout(() => {
          charBg.style.transform = 'scaleX(1)';
          char.style.opacity = '1';
        }, delay);
        
        delay += 50; // 各文字の表示間隔
      }
      
      delay += 200; // 次の行に移る前の待機時間
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateItems();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '10% 0px -40% 0px'
  });

  observer.observe(concernsList);
})();