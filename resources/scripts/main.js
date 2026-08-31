(function () {
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
      hamburger.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = document.querySelectorAll("section, .site-footer");
  const navAnchors = document.querySelectorAll(".nav-links a");

  function setActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute("id");
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

  const scrollBtn = document.querySelector(".scroll-top");
  if (scrollBtn) {
    window.addEventListener(
      "scroll",
      () => {
        scrollBtn.classList.toggle("show", scrollY > 600);
      },
      { passive: true }
    );
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Animated number counters for stat cards
  function animateCounter(el, target, suffix) {
    const duration = 1500;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (match) {
          animateCounter(el, parseInt(match[1], 10), match[2]);
        }
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-number").forEach((el) => {
    const text = el.textContent.trim();
    if (/^\d/.test(text)) counterObserver.observe(el);
  });

  // Contact form — submits to Formspree via fetch
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      formStatus.textContent = "Sending...";
      formStatus.className = "form-status";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            formStatus.textContent = "Thanks! Your message has been sent.";
            formStatus.className = "form-status form-status-success";
            form.reset();
          } else {
            formStatus.textContent =
              "Something went wrong. Please email me directly instead.";
            formStatus.className = "form-status form-status-error";
          }
        })
        .catch(() => {
          formStatus.textContent =
            "Something went wrong. Please email me directly instead.";
          formStatus.className = "form-status form-status-error";
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }
})();
