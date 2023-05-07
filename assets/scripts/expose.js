// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornDropdown = document.querySelector('#horn-select');
  const volumeSlider = document.querySelector('#volume');
  const playButton = document.querySelector('button');
  const imageElement = document.querySelector('img');
  const audioElement = document.querySelector('audio');

  hornDropdown.addEventListener('change', handleHornChange);
  volumeSlider.addEventListener('input', handleVolumeChange);
  playButton.addEventListener('click', playSound);

  function handleHornChange(event) {
    const selectedHorn = event.target.value;
    if (selectedHorn === 'air-horn') {
      imageElement.src = 'assets/images/air-horn.svg';
    } else if (selectedHorn === 'car-horn') {
      imageElement.src = 'assets/images/car-horn.svg';
    } else if (selectedHorn === 'party-horn') {
      imageElement.src = 'assets/images/party-horn.svg';
    } else {
      imageElement.src = 'assets/images/no-image.png';
    }
    audioElement.src = `assets/audio/${selectedHorn}.mp3`;
  }

  function handleVolumeChange(event) {
    const volume = event.target.value;
    if (volume >= 67) {
      document.querySelector('img').src = 'assets/icons/volume-level-3.svg';
    } else if (volume >= 33) {
      document.querySelector('img').src = 'assets/icons/volume-level-2.svg';
    } else if (volume >= 1) {
      document.querySelector('img').src = 'assets/icons/volume-level-1.svg';
    } else {
      document.querySelector('img').src = 'assets/icons/volume-level-0.svg';
    }

    audioElement.volume = volume / 100;
  }

  function playSound() {
    const selectedHorn = hornDropdown.value;
    const volume = volumeSlider.value;

    // Play the corresponding sound for the selected horn at the specified volume
    audioElement.play();

    if (selectedHorn === 'party-horn') {
      jsConfetti.addConfetti();
    }
  }
}
