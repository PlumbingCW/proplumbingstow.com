(function () {
  "use strict";
  var doc = document;
  var root = doc.documentElement;
  var burger = doc.querySelector(".hamburger");
  var drawer = doc.getElementById("mob-drawer");
  var overlay = doc.querySelector("[data-overlay]");
  var closeBtn = doc.querySelector(".drawer-close");
  function openMenu() {
    if (!drawer) return;
    drawer.hidden = false;
    overlay.classList.add("visible");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    root.style.overflow = "hidden";
    var first = drawer.querySelector("a");
    if (first) first.focus();
  }
  function closeMenu() {
    if (!drawer) return;
    drawer.hidden = true;
    overlay.classList.remove("visible");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    root.style.overflow = "";
  }
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      if (drawer.hidden) openMenu(); else closeMenu();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) { closeMenu(); burger.focus(); }
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && !drawer.hidden) closeMenu();
    });
  }
  var items = doc.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-answer");
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });
})();
