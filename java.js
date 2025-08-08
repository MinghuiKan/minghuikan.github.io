(function(){
  const audio = document.getElementById('bgm');
  const btn   = document.getElementById('sound-toggle');


  const TARGET_VOL = 0.35;
  audio.volume = 0;               

  const tryPlay = () => audio.play().catch(()=>{});


  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    tryPlay();
  } else {
    document.addEventListener('DOMContentLoaded', tryPlay, {once:true});
  }


  const unlock = () => {
   
    audio.play().catch(()=>{});
    audio.muted = false;
    fadeTo(audio, TARGET_VOL, 1800); 
    btn.classList.add('on');
    btn.title = 'Sound on';

    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock, {once:true});
  window.addEventListener('keydown', unlock, {once:true});


  btn.addEventListener('click', () => {
    if (btn.classList.contains('on')) {
      fadeTo(audio, 0, 500, () => { audio.muted = true; });
      btn.classList.remove('on');
      btn.title = 'Sound off';
    } else {
      audio.muted = false;
      audio.play().catch(()=>{});
      fadeTo(audio, TARGET_VOL, 800);
      btn.classList.add('on');
      btn.title = 'Sound on';
    }
  });


  function fadeTo(el, target, duration, onDone){
    target = Math.max(0, Math.min(1, target));
    const start = el.volume;
    const delta = target - start;
    const t0 = performance.now();
    function tick(t){
      const k = Math.min(1, (t - t0) / duration);
      el.volume = start + delta * k;
      if (k < 1) requestAnimationFrame(tick);
      else if (onDone) onDone();
    }
    requestAnimationFrame(tick);
  }
})();
document.querySelectorAll('.emotion-color').forEach(block => {
    block.addEventListener('click', () => {
        const emotionText = block.getAttribute('data-emotion');
        document.getElementById('emotion-display').textContent = `Emotion: ${emotionText}`;
    });
});
