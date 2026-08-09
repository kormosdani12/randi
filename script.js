(function () {
  "use strict";

  var HONAPOK = [
    "január", "február", "március", "április", "május", "június",
    "július", "augusztus", "szeptember", "október", "november", "december"
  ];
  var NAPOK_HONAPBAN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var pages = document.querySelectorAll(".page");
  var state = {
    dateLabel: "",
    month: null,
    day: null
  };

  function goToPage(id) {
    pages.forEach(function (page) {
      page.classList.toggle("page--active", page.id === id);
    });
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // ---------- Page 1: kérdés ----------

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
    goToPage("page-2");
  });

  // ---------- Page 2: randi program választás ----------

  var dateOptions = document.querySelectorAll(".date-option");

  dateOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      dateOptions.forEach(function (o) { o.classList.remove("is-selected"); });
      option.classList.add("is-selected");
      state.dateLabel = option.dataset.date;

      setTimeout(function () {
        goToPage("page-3");
      }, 380);
    });
  });

  // ---------- Page 3: hónap + nap választás ----------

  var monthSelect = document.getElementById("select-month");
  var daySelect = document.getElementById("select-day");
  var btnContinue = document.getElementById("btn-continue");
  var timeForm = document.getElementById("time-form");
  var summaryEl = document.getElementById("summary");
  var finalEyebrow = document.getElementById("final-eyebrow");

  HONAPOK.forEach(function (nev, index) {
    var opt = document.createElement("option");
    opt.value = index + 1;
    opt.textContent = capitalize(nev);
    monthSelect.appendChild(opt);
  });

  function populateDays(maxDay) {
    var previousValue = daySelect.value;
    daySelect.innerHTML = '<option value="" disabled selected>Válassz</option>';
    for (var d = 1; d <= maxDay; d++) {
      var opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      daySelect.appendChild(opt);
    }
    if (previousValue && parseInt(previousValue, 10) <= maxDay) {
      daySelect.value = previousValue;
    }
  }

  var AUGUSZTUS = 8;
  monthSelect.value = AUGUSZTUS;
  populateDays(NAPOK_HONAPBAN[AUGUSZTUS - 1]);

  function checkFormComplete() {
    btnContinue.disabled = !(monthSelect.value && daySelect.value);
  }

  monthSelect.addEventListener("change", function () {
    var maxDay = NAPOK_HONAPBAN[parseInt(monthSelect.value, 10) - 1];
    populateDays(maxDay);
    checkFormComplete();
  });

  daySelect.addEventListener("change", checkFormComplete);

  timeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!monthSelect.value || !daySelect.value) return;

    state.month = parseInt(monthSelect.value, 10);
    state.day = parseInt(daySelect.value, 10);

    var dateText = HONAPOK[state.month - 1] + " " + state.day + ".";
    finalEyebrow.textContent = capitalize(dateText);
    summaryEl.textContent = "Randi: " + state.dateLabel;

    goToPage("page-4");
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
