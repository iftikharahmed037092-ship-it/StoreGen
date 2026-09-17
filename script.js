/* =========================================================
   STOREGEN — CUSTOM E-COMMERCE AGENCY
   script.js
   WhatsApp: 03709286179
========================================================= */

"use strict";

/* =========================================================
   1. CONFIGURATION
========================================================= */

const STOREGEN_CONFIG = {
  whatsappNumber: "923709286179",
  businessName: "StoreGen - Custom E-commerce Stores",

  whatsappMessages: {
    general:
      "Assalam o Alaikum! Mujhe StoreGen ke custom e-commerce store ke bare mein maloomat chahiye.",

    price:
      "Assalam o Alaikum! Mujhe custom e-commerce store ki price aur features ke bare mein maloomat chahiye.",

    basic:
      "Assalam o Alaikum! Mujhe Basic Store (Rs 12,000) ke bare mein maloomat chahiye.",

    premium:
      "Assalam o Alaikum! Mujhe Premium Garments/Shoes Store (Rs 18,000) ke bare mein maloomat chahiye.",

    demo:
      "Assalam o Alaikum! Main StoreGen ke live demos dekhna chahta hoon.",

    garments:
      "Assalam o Alaikum! Mujhe ABC Garments demo/store ke bare mein maloomat chahiye.",

    shoes:
      "Assalam o Alaikum! Mujhe Urban Shoes demo/store ke bare mein maloomat chahiye.",

    watches:
      "Assalam o Alaikum! Mujhe Elite Watches demo/store ke bare mein maloomat chahiye.",

    custom:
      "Assalam o Alaikum! Mujhe apne business ke liye custom e-commerce store banwana hai."
  }
};


/* =========================================================
   2. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initMobileMenu();
  initHeaderScroll();
  initSmoothScrolling();
  initRevealAnimations();
  initDemoModal();
  initWhatsAppButtons();
  initPricingButtons();
  initKeyboardAccessibility();
  initCurrentYear();
  initButtonProtection();

});


/* =========================================================
   3. WHATSAPP URL
========================================================= */

function createWhatsAppURL(message) {
  const encodedMessage = encodeURIComponent(message || STOREGEN_CONFIG.whatsappMessages.general);

  return `https://wa.me/${STOREGEN_CONFIG.whatsappNumber}?text=${encodedMessage}`;
}


/* =========================================================
   4. OPEN WHATSAPP
========================================================= */

function openWhatsApp(message) {
  const url = createWhatsAppURL(message);

  window.open(url, "_blank", "noopener,noreferrer");
}


/* =========================================================
   5. MOBILE MENU
========================================================= */

function initMobileMenu() {

  const menuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!menuButton || !mobileNav) return;

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");

  menuButton.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("active");

    menuButton.classList.toggle("active", isOpen);

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

  });


  /* Close after clicking a navigation link */

  const mobileLinks = mobileNav.querySelectorAll("a");

  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("active");
      menuButton.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");

    });

  });


  /* Close menu when clicking outside */

  document.addEventListener("click", event => {

    const clickedInside =
      mobileNav.contains(event.target) ||
      menuButton.contains(event.target);

    if (!clickedInside) {

      mobileNav.classList.remove("active");
      menuButton.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");

    }

  });

}


/* =========================================================
   6. HEADER SCROLL EFFECT
========================================================= */

function initHeaderScroll() {

  const header = document.querySelector(".site-header");

  if (!header) return;

  function updateHeader() {

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

}


/* =========================================================
   7. SMOOTH SCROLLING
========================================================= */

function initSmoothScrolling() {

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

}


/* =========================================================
   8. SCROLL REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  /* Fallback for old browsers */

  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {
      element.classList.add("revealed");
    });

    return;
  }


  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("revealed");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  elements.forEach(element => {
    observer.observe(element);
  });

}


/* =========================================================
   9. DEMO MODAL
========================================================= */

function initDemoModal() {

  const modal = document.querySelector(".demo-modal");

  if (!modal) return;

  const overlay =
    modal.querySelector(".demo-modal-overlay");

  const closeButton =
    modal.querySelector(".demo-modal-close");

  const title =
    modal.querySelector(".demo-modal-box h3");

  const description =
    modal.querySelector(".demo-modal-box p");

  const whatsappButton =
    modal.querySelector(".demo-modal-button");

  let currentDemo = null;


  function openModal(demo) {

    currentDemo = demo;

    const data = getDemoData(demo);

    if (title) {
      title.textContent = data.title;
    }

    if (description) {
      description.textContent = data.description;
    }

    if (whatsappButton) {

      whatsappButton.href =
        createWhatsAppURL(data.message);

      whatsappButton.target = "_blank";
      whatsappButton.rel = "noopener noreferrer";

    }

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    if (closeButton) {
      closeButton.focus();
    }

  }


  function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    currentDemo = null;

  }


  /* Demo buttons */

  const demoButtons =
    document.querySelectorAll(".demo-button");

  demoButtons.forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      const card =
        button.closest(".demo-card");

      const demo =
        card?.dataset.demo ||
        button.dataset.demo ||
        detectDemoFromCard(card);

      openModal(demo);

    });

  });


  /* Close button */

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeModal
    );

  }


  /* Overlay */

  if (overlay) {

    overlay.addEventListener(
      "click",
      closeModal
    );

  }


  /* ESC */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("active")
    ) {

      closeModal();

    }

  });


  /* Store functions globally if needed */

  window.StoreGenDemoModal = {
    open: openModal,
    close: closeModal,
    current: () => currentDemo
  };

}


/* =========================================================
   10. DEMO DATA
========================================================= */

function getDemoData(demo) {

  const demos = {

    garments: {
      title: "ABC Garments",
      description:
        "Modern garments store demo with Size S, M, L and separate color/variant options.",
      message:
        STOREGEN_CONFIG.whatsappMessages.garments
    },

    shoes: {
      title: "Urban Shoes",
      description:
        "Modern footwear store demo with shoe sizes 39 to 44 and product variants.",
      message:
        STOREGEN_CONFIG.whatsappMessages.shoes
    },

    watches: {
      title: "Elite Watches",
      description:
        "Premium watch store demo with a clean product-focused shopping experience.",
      message:
        STOREGEN_CONFIG.whatsappMessages.watches
    }

  };


  if (demos[demo]) {
    return demos[demo];
  }


  return {
    title: "StoreGen Demo",
    description:
      "Explore a modern custom e-commerce store built for your business.",
    message:
      STOREGEN_CONFIG.whatsappMessages.demo
  };

}


/* =========================================================
   11. DETECT DEMO FROM CARD
========================================================= */

function detectDemoFromCard(card) {

  if (!card) return "demo";

  const text =
    card.textContent.toLowerCase();

  if (
    text.includes("abc") ||
    text.includes("garment")
  ) {
    return "garments";
  }

  if (
    text.includes("urban") ||
    text.includes("shoe")
  ) {
    return "shoes";
  }

  if (
    text.includes("elite") ||
    text.includes("watch")
  ) {
    return "watches";
  }

  return "demo";

}


/* =========================================================
   12. WHATSAPP BUTTONS
========================================================= */

function initWhatsAppButtons() {

  const whatsappSelectors = [
    ".header-whatsapp",
    ".floating-whatsapp",
    ".footer-whatsapp",
    ".cta-button"
  ];


  whatsappSelectors.forEach(selector => {

    const buttons =
      document.querySelectorAll(selector);

    buttons.forEach(button => {

      button.addEventListener("click", event => {

        event.preventDefault();

        const customMessage =
          button.dataset.message;

        const message =
          customMessage ||
          STOREGEN_CONFIG.whatsappMessages.general;

        openWhatsApp(message);

      });

    });

  });


  /* Buttons containing Get Price */

  document.querySelectorAll("a, button").forEach(button => {

    const text =
      button.textContent
        .trim()
        .toLowerCase();

    if (
      text.includes("get price") ||
      text.includes("price on whatsapp") ||
      text.includes("whatsapp me")
    ) {

      if (
        !button.classList.contains("demo-button") &&
        !button.classList.contains("pricing-button")
      ) {

        button.addEventListener("click", event => {

          event.preventDefault();

          openWhatsApp(
            STOREGEN_CONFIG.whatsappMessages.price
          );

        });

      }

    }

  });

}


/* =========================================================
   13. PRICING BUTTONS
========================================================= */

function initPricingButtons() {

  const pricingCards =
    document.querySelectorAll(".pricing-card");

  pricingCards.forEach(card => {

    const button =
      card.querySelector(".pricing-button");

    if (!button) return;

    button.addEventListener("click", event => {

      event.preventDefault();

      const text =
        card.textContent.toLowerCase();

      let message =
        STOREGEN_CONFIG.whatsappMessages.custom;


      if (
        text.includes("12,000") ||
        text.includes("basic")
      ) {

        message =
          STOREGEN_CONFIG.whatsappMessages.basic;

      } else if (
        text.includes("18,000") ||
        text.includes("premium")
      ) {

        message =
          STOREGEN_CONFIG.whatsappMessages.premium;

      }


      openWhatsApp(message);

    });

  });

}


/* =========================================================
   14. KEYBOARD ACCESSIBILITY
========================================================= */

function initKeyboardAccessibility() {

  document.addEventListener("keydown", event => {

    if (event.key !== "Enter") return;

    const element =
      document.activeElement;

    if (!element) return;

    if (
      element.classList.contains("demo-button")
    ) {

      element.click();

    }

  });

}


/* =========================================================
   15. CURRENT YEAR
========================================================= */

function initCurrentYear() {

  const yearElements =
    document.querySelectorAll("[data-current-year]");

  const year =
    new Date().getFullYear();

  yearElements.forEach(element => {

    element.textContent = year;

  });

}


/* =========================================================
   16. PREVENT BROKEN BUTTONS
========================================================= */

function initButtonProtection() {

  const buttons =
    document.querySelectorAll(
      'a[href="#"], button[type="button"]'
    );


  buttons.forEach(button => {

    /* Don't interfere with demo buttons */

    if (
      button.classList.contains("demo-button") ||
      button.classList.contains("mobile-menu-button")
    ) {
      return;
    }


    button.addEventListener("click", event => {

      const href =
        button.getAttribute("href");

      if (href === "#") {
        event.preventDefault();
      }

    });

  });

}


/* =========================================================
   17. GLOBAL WHATSAPP HELPERS
========================================================= */

window.StoreGen = {

  config: STOREGEN_CONFIG,

  whatsapp: openWhatsApp,

  openWhatsApp: openWhatsApp,

  getWhatsAppURL: createWhatsAppURL

};


/* =========================================================
   18. OPTIONAL CUSTOM EVENTS
========================================================= */

/*
  You can use these later from another script:

  StoreGen.whatsapp("Your custom message");

  StoreGen.openWhatsApp(
    "I want a garments store."
  );

  StoreGen.getWhatsAppURL(
    "I need a custom website."
  );
*/


/* =========================================================
   19. CONSOLE INFORMATION
========================================================= */

console.log(
  "%cStoreGen",
  "font-size:20px;font-weight:900;"
);

console.log(
  "Custom E-commerce Stores — Website loaded successfully."
);
