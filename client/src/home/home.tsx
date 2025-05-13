function playTTS(text) {
  const audio = new Audio(`/api/tts?text=${encodeURIComponent(text)}`);
  audio.play();
}

// Example usage
<button onClick={() => playTTS("Tell me about quicksort.")}>Ask Question</button>
