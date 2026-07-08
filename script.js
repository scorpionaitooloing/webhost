// Boot-sequence readout in hero corner — mirrors the brand's terminal-boot motif.
// Skips entirely if the user prefers reduced motion.

const lines = [
  "> INIT.SYSTEM",
  "> LOADING MODULES...",
  "> AI CORE           [OK]",
  "> DATA PIPELINE     [OK]",
  "> TOOLCHAIN         [OK]",
  "> SCORPION AI TOOLING",
  "> READY."
];

function typeBootLog(){
  const el = document.getElementById('bootLog');
  if(!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    el.textContent = lines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function step(){
    if(lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    if(charIndex <= currentLine.length){
      output = lines.slice(0, lineIndex).join('\n') +
               (lineIndex > 0 ? '\n' : '') +
               currentLine.slice(0, charIndex);
      el.textContent = output;
      charIndex++;
      setTimeout(step, 18);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 120);
    }
  }
  step();
}

document.addEventListener('DOMContentLoaded', typeBootLog);
