let currentIndex = 0;

function moveLeft(sliderId) {
    let slider = document.getElementById(sliderId);
    let boxWidth = slider.offsetWidth / 3; // Breedte van de zichtbare slider
  
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = 3; // Als we bij box 1 zijn en naar links klikken, ga naar box 6
    }
    slider.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
  }
  
  function moveRight(sliderId) {
    let slider = document.getElementById(sliderId);
    let boxWidth = slider.offsetWidth / 3; // Breedte van de zichtbare slider
  
    if (currentIndex < 3) {
      currentIndex++;
    } else {
      currentIndex = 0; // Als we bij box 6 zijn en naar rechts klikken, ga naar box 1
    }
    slider.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
  }
  