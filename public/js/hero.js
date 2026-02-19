// Hero Section — Countdown Timer
// Counts down to a target date and updates the hero countdown boxes.

(function () {
  'use strict';

  // ── TARGET DATE (change this to your actual registration close date) ──
  var TARGET_DATE = new Date('2026-04-15T23:59:59');

  var els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs')
  };

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function tick() {
    var now  = Date.now();
    var diff = TARGET_DATE.getTime() - now;

    if (diff <= 0) {
      if (els.days)  els.days.textContent  = '00';
      if (els.hours) els.hours.textContent = '00';
      if (els.mins)  els.mins.textContent  = '00';
      if (els.secs)  els.secs.textContent  = '00';
      return;
    }

    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);

    if (els.days)  els.days.textContent  = pad(d);
    if (els.hours) els.hours.textContent = pad(h);
    if (els.mins)  els.mins.textContent  = pad(m);
    if (els.secs)  els.secs.textContent  = pad(s);
  }

  function init() {
    if (!els.days) return;
    tick();
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
