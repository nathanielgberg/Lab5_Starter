// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const textToSpeakElement = document.getElementById('text-to-speak');
  const voiceSelectElement = document.getElementById('voice-select');
  const buttonElement = document.querySelector('button');
  const faceImageElement = document.querySelector('img');

  populateVoices();

  function populateVoices() {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();

      voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelectElement.appendChild(option);
      });
    }
  }

  buttonElement.addEventListener('click', () => {
    const textToSpeak = textToSpeakElement.value;
    const selectedVoice = voiceSelectElement.value;

    if ('speechSynthesis' in window && textToSpeak && selectedVoice) {
      const synthesis = new SpeechSynthesisUtterance(textToSpeak);
      const voices = speechSynthesis.getVoices();
      const selectedVoiceObj = voices.find((voice) => voice.name === selectedVoice);

      if (selectedVoiceObj) {
        synthesis.voice = selectedVoiceObj;
        synthesis.addEventListener('start', handleSpeechStart);
        synthesis.addEventListener('end', handleSpeechEnd);
        speechSynthesis.speak(synthesis);
      }
    }
  });

  function handleSpeechStart() {
    faceImageElement.src = 'assets/images/smiling-open.png';
  }

  function handleSpeechEnd() {
    faceImageElement.src = 'assets/images/smiling.png';
  }
}
