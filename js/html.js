smoothScroll = (target, duration) => {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = easing(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    easing = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 *t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

var home = document.querySelector('#home');
var about = document.querySelector('#about');
var services = document.querySelector('#services');
var contact = document.querySelector('#contact');

var homeLink = document.querySelector('nav a[href="#home"]');
var aboutLink = document.querySelector('nav a[href="#about"]');
var servicesLink = document.querySelector('nav a[href="#services"]');
var contactLink = document.querySelector('nav a[href="#contact"]');

homeLink.addEventListener('click', function() {
    smoothScroll('#home', 1000);
});

aboutLink.addEventListener('click', function() {
    smoothScroll('#about', 1000);
});

servicesLink.addEventListener('click', function() {
    smoothScroll('#services', 1000);
});

contactLink.addEventListener('click', function() {
    smoothScroll('#contact', 1000);
});