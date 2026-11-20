/* KIventaro: gestellte Chatbot-Demo und Loom-Einbettung nach Klick.
   Die Demo läuft nur im Browser. Es werden keine Daten gesendet oder gespeichert. */
(function () {
  "use strict";

  var START = "start";
  var FLOW = {
    start: {
      bot: ["Hallo und willkommen bei deinem Salon.", "Wie können wir dir helfen?"],
      options: [["Termin vereinbaren", "behandlung"], ["Preise und Leistungen", "preise"], ["Persönliche Beratung", "beratung"]]
    },
    behandlung: {
      bot: ["Gerne. Für welche Behandlung interessierst du dich?"],
      options: [["Schnitt und Styling", "haarlaenge"], ["Farbe und Balayage", "haarlaenge"], ["Sonstige Frage", "sonstige"]]
    },
    haarlaenge: {
      bot: ["Danke. Wie lang sind deine Haare aktuell?"],
      options: [["Kurz", "terminart"], ["Mittel", "terminart"], ["Lang", "terminart"]]
    },
    terminart: {
      bot: ["Möchtest du einen Beratungstermin oder lieber einen Anruf von unserem Team?"],
      options: [["Beratungstermin", "ende_termin"], ["Anruf vom Team", "ende_anruf"], ["Online-Termin buchen", "online"]]
    },
    online: {
      bot: ["Hier würde der Chatbot zur Online-Terminbuchung deines Salons führen.", "Diese Möglichkeit gibt es nur, wenn dein Salon schon eine Online-Terminbuchung nutzt."],
      demo: "In dieser Demo führt der Schritt nirgendwohin.",
      options: [["Zurück zum Start", START]]
    },
    ende_termin: {
      bot: ["Vielen Dank. Unser Team meldet sich persönlich bei dir, um den Beratungstermin abzustimmen."],
      demo: "Beim echten Chatbot sieht dein Team jetzt Behandlung und Haarlänge. In dieser Demo wird nichts gesendet.",
      options: [["Zurück zum Start", START]]
    },
    ende_anruf: {
      bot: ["Vielen Dank. Unser Team ruft dich an, sobald jemand frei ist."],
      demo: "Beim echten Chatbot sieht dein Team jetzt Behandlung und Haarlänge. In dieser Demo wird nichts gesendet.",
      options: [["Zurück zum Start", START]]
    },
    preise: {
      bot: ["Für welche Leistung möchtest du die Preise sehen?"],
      options: [["Schnitt und Styling", "preis_schnitt"], ["Farbe und Balayage", "preis_farbe"], ["Pflege", "preis_pflege"]]
    },
    preis_schnitt: { ref: "preis", label: "Schnitt und Styling" },
    preis_farbe: { ref: "preis", label: "Farbe und Balayage" },
    preis_pflege: { ref: "preis", label: "Pflege" },
    beratung: {
      bot: ["Gerne beraten wir dich persönlich. Wobei möchtest du Unterstützung?"],
      options: [["Farbe", "terminart"], ["Frisur", "terminart"], ["Sonstige Frage", "sonstige"]]
    },
    sonstige: {
      bot: ["Wir haben deine Unterhaltung an unser Team weitergegeben. Wir melden uns persönlich bei dir."],
      demo: "Beim echten Chatbot schreibt die Kundin ihre Frage, und dein Team antwortet selbst. Diese Demo hat bewusst kein Eingabefeld.",
      options: [["Zurück zum Start", START]]
    }
  };

  function preisStep(label) {
    return {
      bot: ["Hier stehen die Preise deines Salons für " + label + "."],
      demo: "Platzhalter. Beim echten Chatbot stehen hier deine Leistungen und Preise.",
      extra: "Möchtest du dazu einen Beratungstermin oder einen Anruf vom Team?",
      options: [["Beratungstermin", "ende_termin"], ["Anruf vom Team", "ende_anruf"], ["Zurück zum Start", START]]
    };
  }

  var chat = document.getElementById("chat");
  var choices = document.getElementById("choices");
  var reset = document.getElementById("demo-reset");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];

  function later(fn, ms) { timers.push(setTimeout(fn, reduced ? 0 : ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function bubble(text, who) {
    var el = document.createElement("div");
    el.className = "bubble " + who;
    el.textContent = text;
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
  }

  function demoNote(text) {
    var el = document.createElement("div");
    el.className = "typing";
    el.textContent = "Demo-Hinweis: " + text;
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
  }

  function show(key) {
    var step = FLOW[key];
    if (step.ref === "preis") step = preisStep(step.label);
    choices.innerHTML = "";
    var msgs = step.bot.slice();
    if (step.extra) msgs.push(step.extra);
    var delay = 450;
    msgs.forEach(function (m, i) {
      later(function () { bubble(m, "bot"); }, delay * (i + 1));
    });
    later(function () {
      if (step.demo) demoNote(step.demo);
      step.options.forEach(function (o) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = o[0];
        b.addEventListener("click", function () {
          choices.innerHTML = "";
          if (o[1] === START) { restart(); return; }
          bubble(o[0], "user");
          show(o[1]);
        });
        choices.appendChild(b);
      });
    }, delay * (msgs.length + 1));
  }

  function restart() {
    clearTimers();
    chat.innerHTML = "";
    choices.innerHTML = "";
    show(START);
  }

  if (chat && choices) {
    restart();
    if (reset) reset.addEventListener("click", restart);
  }

  /* Loom erst nach Klick laden */
  var box = document.getElementById("video-box");
  var load = document.getElementById("video-load");
  if (box && load) {
    var src = (box.getAttribute("data-src") || "").trim();
    if (!/^https:\/\/www\.loom\.com\/embed\/[A-Za-z0-9]+/.test(src)) {
      load.hidden = true;
      var missing = box.querySelector(".video-missing");
      if (missing) missing.hidden = false;
    } else {
      load.addEventListener("click", function () {
        var f = document.createElement("iframe");
        f.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
        f.title = "Demo-Video: Instagram-Chatbot für Friseursalons";
        f.allow = "autoplay; fullscreen";
        f.allowFullscreen = true;
        f.referrerPolicy = "strict-origin-when-cross-origin";
        box.innerHTML = "";
        box.appendChild(f);
      });
    }
  }
})();
