const chamber = document.getElementById('chamber');
const centerCircle = document.getElementById('centerCircle');
const alternateCircle = document.getElementById('alternateCircle');
const wordItems = document.querySelectorAll('.word-item');
const slots = document.querySelectorAll('.slot');
const blurbs = [
    "Here we Alpha!",
    "Bravo to you",
    "Charlie was a young man",
    "Delta Airlines Ain’t Great"
];
let isCenterVisible = true;
wordItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        chamber.style.transform = "rotate(" + (90 * index) + "deg)";
        centerCircle.style.transform = "translate(-50%, -50%) rotate(" + (-90 * index) + "deg)";
        alternateCircle.style.transform = "translate(-50%, -50%) rotate(" + (-90 * index) + "deg)";
        slots.forEach((s) => {
            s.querySelector('.word').style.transform = "rotate(" + (-90 * index) + "deg)";
        });
        if (isCenterVisible) {
            centerCircle.style.opacity = 0;
            alternateCircle.textContent = blurbs[index];
        } else {
            centerCircle.style.opacity = 1;
            centerCircle.textContent = blurbs[index];
        }
        isCenterVisible = !isCenterVisible;
    });
});
