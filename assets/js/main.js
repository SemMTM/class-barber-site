(function () {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  if (toggle && navigation) {
    const closeNavigation = function () {
      navigation.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
      document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", function () {
      const willOpen = !navigation.classList.contains("is-open");
      navigation.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.textContent = willOpen ? "Close" : "Menu";
      document.body.classList.toggle("nav-open", willOpen);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNavigation();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        closeNavigation();
      }
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canAnimate = !reduceMotion && window.gsap && window.ScrollTrigger;

  if (!canAnimate) {
    return;
  }

  window.gsap.registerPlugin(window.ScrollTrigger);

  window.gsap.utils.toArray(".motion-image").forEach(function (item) {
    window.gsap.fromTo(item, { scale: 0.94, opacity: 0.82 }, {
      scale: 1,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top 92%",
        end: "top 42%",
        scrub: true
      }
    });
  });

  const proofIntro = document.querySelector(".proof-intro");
  const proofLayout = document.querySelector(".proof-layout");

  if (proofIntro && proofLayout && window.innerWidth >= 1088) {
    window.ScrollTrigger.create({
      trigger: proofLayout,
      start: "top 10%",
      end: "bottom 70%",
      pin: proofIntro,
      pinSpacing: false
    });
  }

  window.gsap.utils.toArray(".proof-motion").forEach(function (card) {
    window.gsap.from(card, {
      y: 70,
      opacity: 0.25,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 84%"
      }
    });
  });
})();
