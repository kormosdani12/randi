(function () {
  "use strict";

  var pages = document.querySelectorAll(".page");
  var state = {
    program: "",
    slotLabel: ""
  };

  function goToPage(id) {
    pages.forEach(function (page) {
      page.classList.toggle("page--active", page.id === id);
    });
  }

  // ---------- Oldal 1-2: bocsánatkérés + bevezető ----------

  document.getElementById("btn-sorry-next").addEventListener("click", function () {
    goToPage("page-intro");
  });

  document.getElementById("btn-intro-next").addEventListener("click", function () {
    goToPage("page-question");
  });

  // ---------- Oldal 3: kérdés ----------

  var btnYes = document.getElementById("btn-yes");
  var btnNo = document.getElementById("btn-no");

  function hideNoLabel() {
    btnNo.classList.add("is-away");
  }

  function showNoLabel() {
    btnNo.classList.remove("is-away");
  }

  btnNo.addEventListener("mouseenter", hideNoLabel);
  btnNo.addEventListener("mouseleave", showNoLabel);

  ["touchstart", "pointerdown", "click"].forEach(function (evt) {
    btnNo.addEventListener(evt, function (e) {
      e.preventDefault();
      hideNoLabel();
      setTimeout(showNoLabel, 1200);
    });
  });

  btnYes.addEventListener("click", function () {
    goToPage("page-programs");
  });

  // ---------- Oldal 4: randi program választás ----------

  var programOptions = document.querySelectorAll(".program-option");

  programOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      programOptions.forEach(function (o) { o.classList.remove("is-selected"); });
      option.classList.add("is-selected");
      state.program = option.dataset.program;

      setTimeout(function () {
        if (state.program === "Margit sziget") {
          goToPage("page-margit-gallery");
        } else {
          goToPage("page-date");
        }
      }, 380);
    });
  });

  // ---------- Oldal 4b: Margit-szigeti galéria ----------

  document.getElementById("btn-gallery-next").addEventListener("click", function () {
    goToPage("page-date");
  });

  // ---------- Oldal 5: időpont választás ----------

  var slotOptions = document.querySelectorAll(".slot-option");
  var summaryEl = document.getElementById("summary");
  var finalEyebrow = document.getElementById("final-eyebrow");

  slotOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      slotOptions.forEach(function (o) { o.classList.remove("is-selected"); });
      option.classList.add("is-selected");
      state.slotLabel = option.dataset.label;

      setTimeout(function () {
        finalEyebrow.textContent = state.slotLabel;
        summaryEl.textContent = "Randi: " + state.program;
        goToPage("page-final");
      }, 380);
    });
  });

  // ---------- Díszítő lebegő elemek ----------

  var petalsContainer = document.querySelector(".petals");
  var PETAL_COUNT = 14;

  for (var i = 0; i < PETAL_COUNT; i++) {
    var petal = document.createElement("span");
    var size = 6 + Math.random() * 8;
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    petal.style.animationDuration = 9 + Math.random() * 10 + "s";
    petal.style.animationDelay = Math.random() * 10 + "s";
    petalsContainer.appendChild(petal);
  }
})();
