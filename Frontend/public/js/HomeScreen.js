let currentIndex = {
  audio: 0,
  belichting: 0,
  varia: 0,
  video: 0,
  xr: 0
};

//progress bar
function updateProgressBar(sliderName, currentIndex, maxIndex) {
  let progressBar = document.getElementById(`${sliderName}ProgressBar`);
  if (!progressBar) return;

  let progressBarInner = progressBar.querySelector('.progress-bar-inner');
  let progress = (currentIndex / maxIndex) * 100;
  progressBarInner.style.width = `${progress}%`;
}

function moveLeft(sliderId) {
  let slider = document.getElementById(sliderId);
  let sliderName = sliderId.replace('Slider', '');
  let productBoxes = slider.querySelectorAll('.product-box');
  let boxWidth = productBoxes[0].offsetWidth + 40; // De 40px komt van de margin
  let maxIndex = productBoxes.length - Math.floor(slider.offsetWidth / boxWidth);

  if (currentIndex[sliderName] > 0) {
      currentIndex[sliderName]--;
  } else {
      currentIndex[sliderName] = maxIndex;
  }

  slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
  updateProgressBar(sliderName, currentIndex[sliderName], maxIndex);
}

// Move the slider to the right

function moveRight(sliderId) {
  let slider = document.getElementById(sliderId);
  let sliderName = sliderId.replace('Slider', '');
  let productBoxes = slider.querySelectorAll('.product-box');
  let boxWidth = productBoxes[0].offsetWidth + 40; // De 40px komt van de margin
  let maxIndex = productBoxes.length - Math.floor(slider.offsetWidth / boxWidth);

  if (currentIndex[sliderName] < maxIndex) {
      currentIndex[sliderName]++;
  } else {
      currentIndex[sliderName] = 0;
  }

  slider.style.transform = `translateX(-${currentIndex[sliderName] * boxWidth}px)`;
  updateProgressBar(sliderName, currentIndex[sliderName], maxIndex);
}