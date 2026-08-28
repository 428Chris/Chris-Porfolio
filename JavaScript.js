/* ---------- 8. TYPEWRITER EFFECT ---------- */
var typewriterEl = $('#typewriter-text');
if (typewriterEl) {
  var phrases = [
    'Building tomorrow, one line at a time.',
    'Making the web a little more beautiful.',
    'My code works... eventually.',
    'Clean code. Bold ideas.'
  ];
  
  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  
  function typeEffect() {
    var currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Delete a character
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Type a character
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    // Typing speed is slower (80ms), deleting is faster (40ms) for realism
    var currentSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      currentSpeed = 2500; // Pause at the end of the phrase so they can read it
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
      currentSpeed = 500; // Brief pause before typing the next phrase
    }

    setTimeout(typeEffect, currentSpeed);
  }

  // Start the loop after a short initial delay
  setTimeout(typeEffect, 800);
}