/* =====================================================
   SCROLL ANIMATION (IntersectionObserver)
   Menandai elemen ber-atribut [data-animate] dengan class
   "in-view" begitu elemen tersebut masuk ke area layar (viewport),
   lalu CSS ([data-animate].in-view) yang menjalankan transisinya.
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const animatedEls = document.querySelectorAll("[data-animate]");

  // Kalau browser gak support IntersectionObserver (sangat jarang),
  // langsung tampilkan semua elemen tanpa animasi.
  if (!("IntersectionObserver" in window)) {
    animatedEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          entry.target.style.setProperty("--delay", `${delay}ms`);
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // animasi cukup sekali
        }
      });
    },
    {
      threshold: 0.15, // elemen dianggap "kelihatan" kalau 15% bagiannya masuk layar
      rootMargin: "0px 0px -60px 0px", // trigger sedikit lebih awal dari bawah layar
    },
  );

  animatedEls.forEach((el) => observer.observe(el));
});

// Nav Active on Scroll
// console.log("Scrollspy JS loaded"); 
(function () {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(
    ".custom-nav-link, .custom-offcanvas-link",
  );

  // console.log("Jumlah section terdeteksi:", sections.length);  
  // console.log("Jumlah nav link terdeteksi:", navLinks.length);

  if (!sections.length || !navLinks.length) {
    console.warn("Scrollspy manual: section atau nav link tidak ditemukan!");
    return;
  }

  const setActive = (id) => {
    // console.log("Section aktif:", id);   =
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href === "#" + id) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-120px 0px -60% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
})();
