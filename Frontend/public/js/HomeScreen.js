let currentIndex = {
  audio: 0,
  belichting: 0,
  varia: 0,
  video: 0,
  xr: 0
};

function moveLeft(sliderId) {
    let slider = document.getElementById(sliderId);
    let sliderName = sliderId.replace('Slider', '');
    let productBoxes = slider.querySelectorAll('.product-box');
    let boxWidth = productBoxes[0].offsetWidth + 40; // De 40px komt van de margin

    if (currentIndex[sliderName] > 0) {
        currentIndex[sliderName]--;
    }

    slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
}

function moveRight(sliderId) {
    let slider = document.getElementById(sliderId);
    let sliderName = sliderId.replace('Slider', '');
    let productBoxes = slider.querySelectorAll('.product-box');
    let boxWidth = productBoxes[0].offsetWidth + 40; // De 40px komt van de margin
    let maxIndex = productBoxes.length - Math.floor(slider.offsetWidth / boxWidth);

    if (currentIndex[sliderName] < maxIndex) {
        currentIndex[sliderName]++;
    }

    slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
}