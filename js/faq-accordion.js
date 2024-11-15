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
