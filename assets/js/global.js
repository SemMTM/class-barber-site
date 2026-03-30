(() => {
  const body = document.body;
  const navToggle = document.querySelector(".nav1-toggle");
  const navHeader = document.querySelector("#nav1-navigation");
  const overlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link, .nav1-cta-button");

  if (!navHeader || !navToggle) {
    return;
  }

  const onScroll = () => {
    navHeader.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMainNav = () => {
    navToggle.classList.remove("active");
    navHeader.classList.remove("nav1-active");
    body.classList.remove("nav1-open");
    navToggle.setAttribute("aria-expanded", "false");

    if (overlay) {
      overlay.classList.remove("active");
    }

    if (window.scrollY <= 10) {
      navHeader.classList.remove("is-scrolled");
    }
  };

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.classList.toggle("active");
    navHeader.classList.toggle("nav1-active");
    body.classList.toggle("nav1-open");
    navToggle.setAttribute("aria-expanded", String(!isExpanded));

    if (overlay) {
      overlay.classList.toggle("active");
    }

    if (window.scrollY > 10 || navHeader.classList.contains("nav1-active")) {
      navHeader.classList.add("is-scrolled");
    } else {
      navHeader.classList.remove("is-scrolled");
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeMainNav);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth >= 1024) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const isSamePageHash = href.startsWith("#") || href.startsWith("/#");

      if (isSamePageHash) {
        closeMainNav();
      }
    });
  });

  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  revealEls.forEach((el) => observer.observe(el));
})();
