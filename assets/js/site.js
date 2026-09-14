/* Canjain Global Advisors — site behaviour
   ------------------------------------------------------------------
   LEAD CAPTURE (important):
   GitHub Pages cannot run server code, so the enquiry form does not
   post anywhere by itself. Paste your n8n / Google Apps Script webhook
   URL below and every enquiry will also be recorded there before the
   WhatsApp or email window opens. Leave it empty to disable.
   ------------------------------------------------------------------ */
var LEAD_WEBHOOK = "";

var FIRM = {
  waNumber: "919899900300",
  salesEmail: "arm@cgaindia.com"
};

/* ---------- mobile navigation ---------- */
(function () {
  var toggle = document.querySelector("[data-navtoggle]");
  var nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.setAttribute("data-open", open ? "true" : "false");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  }
  toggle.addEventListener("click", function () {
    setOpen(nav.getAttribute("data-open") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && window.innerWidth <= 900) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();

/* ---------- drop broken images instead of showing a torn icon ---------- */
(function () {
  var imgs = document.querySelectorAll("img[data-optional]");
  for (var i = 0; i < imgs.length; i++) {
    (function (img) {
      function drop() { if (img.parentNode) img.remove(); }
      img.addEventListener("error", drop);
      /* the image may already have failed before this script ran */
      if (img.complete && img.naturalWidth === 0) drop();
    })(imgs[i]);
  }
})();

/* ---------- enquiry form ---------- */
(function () {
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var ok = form.querySelector("[data-ok]");

  function field(name) {
    return form.querySelector('[name="' + name + '"]');
  }
  function mark(el, invalid) {
    var wrap = el.closest(".field");
    if (wrap) wrap.setAttribute("data-invalid", invalid ? "true" : "false");
  }

  function validate() {
    var valid = true;
    var name = field("name");
    var mobile = field("mobile");
    var email = field("email");

    if (name.value.trim().length < 2) { mark(name, true); valid = false; } else mark(name, false);

    var digits = mobile.value.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 12) { mark(mobile, true); valid = false; } else mark(mobile, false);

    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      mark(email, true); valid = false;
    } else mark(email, false);

    if (!valid) {
      var bad = form.querySelector('.field[data-invalid="true"] input, .field[data-invalid="true"] select');
      if (bad) bad.focus();
    }
    return valid;
  }

  function payload() {
    return {
      name: field("name").value.trim(),
      mobile: field("mobile").value.trim(),
      email: field("email").value.trim(),
      city: field("city").value.trim(),
      service: field("service").value,
      message: field("message").value.trim(),
      page: window.location.pathname,
      at: new Date().toISOString()
    };
  }

  function record(data) {
    if (!LEAD_WEBHOOK) return Promise.resolve();
    try {
      return fetch(LEAD_WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).catch(function () {});
    } catch (e) {
      return Promise.resolve();
    }
  }

  function asText(d) {
    return (
      "New enquiry from cgaindia.com\n\n" +
      "Name: " + d.name + "\n" +
      "Mobile: " + d.mobile + "\n" +
      (d.email ? "Email: " + d.email + "\n" : "") +
      (d.city ? "City / state: " + d.city + "\n" : "") +
      "Service: " + d.service + "\n" +
      (d.message ? "\nSituation:\n" + d.message + "\n" : "")
    );
  }

  function done() {
    if (ok) {
      ok.setAttribute("data-show", "true");
      ok.focus && ok.focus();
    }
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); });

  var waBtn = form.querySelector("[data-send-wa]");
  if (waBtn) {
    waBtn.addEventListener("click", function () {
      if (!validate()) return;
      var d = payload();
      record(d);
      window.open(
        "https://wa.me/" + FIRM.waNumber + "?text=" + encodeURIComponent(asText(d)),
        "_blank",
        "noopener"
      );
      done();
    });
  }

  var mailBtn = form.querySelector("[data-send-mail]");
  if (mailBtn) {
    mailBtn.addEventListener("click", function () {
      if (!validate()) return;
      var d = payload();
      record(d);
      window.location.href =
        "mailto:" + FIRM.salesEmail +
        "?subject=" + encodeURIComponent("Enquiry — " + d.service + " — " + d.name) +
        "&body=" + encodeURIComponent(asText(d));
      done();
    });
  }

  /* prefill the service dropdown from a ?service= link */
  var wanted = new URLSearchParams(window.location.search).get("service");
  if (wanted) {
    var sel = field("service");
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value.toLowerCase().indexOf(wanted.toLowerCase()) === 0) {
        sel.selectedIndex = i;
        break;
      }
    }
  }
})();

/* ---------- current year in the footer ---------- */
(function () {
  var y = document.querySelectorAll("[data-year]");
  for (var i = 0; i < y.length; i++) y[i].textContent = new Date().getFullYear();
})();
