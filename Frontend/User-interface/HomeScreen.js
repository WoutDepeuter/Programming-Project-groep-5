let currentIndex = {
  audio: 0,
  belichting: 0,
  varia: 0,
  video: 0,
  xr: 0
};

function moveLeft(sliderId) {
    let slider = document.getElementById(sliderId);
    let boxWidth = slider.offsetWidth / 3;
    let sliderName = sliderId.split('-')[0]; //Naam van slider ophalen
  
    if (currentIndex[sliderName] > 0) {
      currentIndex[sliderName]--;
    } else {
      currentIndex[sliderName] = 3;
    }
    slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
  }
  
  function moveRight(sliderId) {
    let slider = document.getElementById(sliderId);
    let boxWidth = slider.offsetWidth / 3;
    let sliderName = sliderId.split('-')[0]; //Naam van slider ophalen
  
    if (currentIndex[sliderName] < 3) {
      currentIndex[sliderName]++;
    } else {
      currentIndex[sliderName] = 0;
    }
    slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
  }
  