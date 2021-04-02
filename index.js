let recognizer;

function predictWord() {
 // Array of words that the recognizer is trained to recognize.
 const words = recognizer.wordLabels();
 recognizer.listen(({scores}) => {
   // Turn scores into a list of (score,word) pairs.
   scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
   // Find the most probable word.
   scores.sort((s1, s2) => s2.score - s1.score);

    // console.log(recognizer);

   document.querySelector('#console').textContent += " " + scores[0].word;
  // document.querySelector('#console').textContent = scores[0].word;

 }, {probabilityThreshold: 0.75});
}

async function registerSW() {
  
  console.log(navigator)
  if ('serviceWorker' in navigator) {
    
    console.log("Service worker present");
    try {
      await navigator.serviceWorker.register('/sw.js');

    } catch (e) {
      console.log(`SW registration failed`);
    }
  }else{
    console.log("No service worker??");
  }
}

async function app() {
  recognizer = speechCommands.create('BROWSER_FFT');
  await recognizer.ensureModelLoaded();
  predictWord();
  
  registerSW();
  
}

app();