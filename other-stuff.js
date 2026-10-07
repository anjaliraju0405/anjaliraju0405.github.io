(function () {
    var panel = document.getElementById('other-stuff');
    var backdrop = document.querySelector('.other-stuff-backdrop');
    var trigger = document.querySelector('.other-stuff-trigger');
    var closeButton = panel.querySelector('.other-stuff__close');
    var closeTimer;

    function open() {
        clearTimeout(closeTimer);
        panel.hidden = false;
        backdrop.hidden = false;
        // Force a reflow so the slide-in transition runs after un-hiding
        panel.getBoundingClientRect();
        panel.classList.add('is-open');
        backdrop.classList.add('is-open');
        document.body.classList.add('other-stuff-locked');
        trigger.setAttribute('aria-expanded', 'true');
        closeButton.focus();
    }

    function close() {
        if (!panel.classList.contains('is-open')) return;
        panel.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        document.body.classList.remove('other-stuff-locked');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        closeTimer = setTimeout(function () {
            panel.hidden = true;
            backdrop.hidden = true;
        }, reduceMotion ? 0 : 450);
    }

    trigger.addEventListener('click', open);

    document.querySelectorAll('[data-other-stuff-close]').forEach(function (el) {
        el.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') close();
    });
})();
