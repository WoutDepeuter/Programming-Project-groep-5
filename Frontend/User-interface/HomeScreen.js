let currentIndex = {
  audio: 0,
  belichting: 0,
  varia: 0,
  video: 0,
  xr: 0
};

function moveLeft(sliderId) {
    let slider = document.getElementById(sliderId);
    let visibleWidth = slider.offsetWidth; //Breedte van zichtbare slider
    let visibleBoxes = 4;
    let boxWidth = visibleWidth / visibleBoxes;
    let sliderName = sliderId.split('-')[0]; //Naam van slider ophalen

    if(currentIndex[sliderName] > 0){
      currentIndex[sliderName]--;
    }
    slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
  }
  
  function moveRight(sliderId) {
    let slider = document.getElementById(sliderId);
    let visibleWidth = slider.offsetWidth; //Breedte van zichtbare slider
    let visibleBoxes = 4;
    let boxWidth = visibleWidth / visibleBoxes;
    let sliderName = sliderId.split('-')[0]; //Naam van slider ophalen
  
    if (currentIndex[sliderName] < 3) {
      currentIndex[sliderName]++;
    } else {
      currentIndex[sliderName] = 0;
    }
    slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
  }
  