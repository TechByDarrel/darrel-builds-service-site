console.log("Darrel Builds results section site loaded successfully.");

const reveals = document.querySelectorAll(".reveal");
const navbar = document.getElementById("navbar");
const scrollProgressBar = document.getElementById("scrollProgressBar");
const backToTop = document.getElementById("backToTop");
const counters = document.querySelectorAll(".counter");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section-anchor");
const tiltCards = document.querySelectorAll(".tilt-card");
const faqItems = document.querySelectorAll(".faq-item");
const faqQuestions = document.querySelectorAll(".faq-question");

const inquiryModal = document.getElementById("inquiryModal");
const openInquiryBtn = document.getElementById("openInquiryBtn");
const openInquiryBtnBottom = document.getElementById("openInquiryBtnBottom");
const closeInquiryBtn = document.getElementById("closeInquiryBtn");
const cancelInquiryBtn = document.getElementById("cancelInquiryBtn");
const inquiryForm = document.getElementById("inquiryForm");

let countersStarted = false;

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add("active");
    }
  });
}

function handleNavbar() {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function handleScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgressBar.style.width = `${progress}%`;
}

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

function startCountersIfVisible() {
  if (countersStarted) return;

  const statsSection = document.querySelector(".stats");
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    counters.forEach(animateCounter);
    countersStarted = true;
  }
}

function updateActiveNav() {
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    const href = link.getAttribute("href");
    if (href === `#${currentId}`) {
      link.classList.add("active-link");
    }
  });
}

function handleTilt() {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function openModal() {
  inquiryModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  inquiryModal.classList.remove("show");
  document.body.style.overflow = "";
}

function setupFAQ() {
  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answerWrap = item.querySelector(".faq-answer-wrap");
      const answer = item.querySelector(".faq-answer");
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        const wrap = faq.querySelector(".faq-answer-wrap");
        wrap.style.maxHeight = "0px";
      });

      if (!isActive) {
        item.classList.add("active");
        answerWrap.style.maxHeight = answer.offsetHeight + "px";
      }
    });
  });
}

openInquiryBtn?.addEventListener("click", openModal);
openInquiryBtnBottom?.addEventListener("click", openModal);
closeInquiryBtn?.addEventListener("click", closeModal);
cancelInquiryBtn?.addEventListener("click", closeModal);

inquiryModal?.addEventListener("click", (e) => {
  if (e.target === inquiryModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && inquiryModal.classList.contains("show")) {
    closeModal();
  }
});

inquiryForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("clientName").value.trim();
  const business = document.getElementById("businessName").value.trim();
  const email = document.getElementById("clientEmail").value.trim();
  const budget = document.getElementById("budget").value;
  const projectType = document.getElementById("projectType").value;
  const message = document.getElementById("projectMessage").value.trim();

  const text =
`Hello Darrel Builds, I want to make an inquiry.

Name: ${name}
Business Name: ${business}
Email: ${email || "Not provided"}
Budget: ${budget}
Project Type: ${projectType}

Project Details:
${message}`;

  const whatsappUrl = `https://wa.me/2349017049686?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank");

  inquiryForm.reset();
  closeModal();
});

window.addEventListener("scroll", () => {
  revealOnScroll();
  handleNavbar();
  handleScrollProgress();
  handleBackToTop();
  startCountersIfVisible();
  updateActiveNav();
});

window.addEventListener("load", () => {
  revealOnScroll();
  handleNavbar();
  handleScrollProgress();
  handleBackToTop();
  startCountersIfVisible();
  updateActiveNav();
  handleTilt();
  setupFAQ();
});