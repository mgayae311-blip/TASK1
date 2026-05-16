(()=>{
  const display = document.getElementById('display');
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const resetBtn = document.getElementById('reset');
  const lapBtn = document.getElementById('lap');
  const lapsList = document.getElementById('laps');

  let startTime=0, elapsed=0, rafId=null; // elapsed in ms

  function fmt(ms){
    const msPart = ms%1000;
    const totalSeconds = Math.floor(ms/1000);
    const s = totalSeconds%60;
    const m = Math.floor(totalSeconds/60)%60;
    const h = Math.floor(totalSeconds/3600);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(msPart).padStart(3,'0')}`;
  }

  function update(){
    const now = performance.now();
    const current = elapsed + (now - startTime);
    display.textContent = fmt(Math.floor(current));
    rafId = requestAnimationFrame(update);
  }

  startBtn.addEventListener('click',()=>{
    startTime = performance.now();
    rafId = requestAnimationFrame(update);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
    lapBtn.disabled = false;
  });

  stopBtn.addEventListener('click',()=>{
    if(rafId) cancelAnimationFrame(rafId);
    const now = performance.now();
    elapsed += now - startTime;
    rafId = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    lapBtn.disabled = true;
  });

  resetBtn.addEventListener('click',()=>{
    elapsed = 0;
    display.textContent = '00:00:00.000';
    lapsList.innerHTML = '';
    resetBtn.disabled = true;
  });

  lapBtn.addEventListener('click',()=>{
    const now = performance.now();
    const current = Math.floor(elapsed + (rafId? now - startTime: 0));
    const li = document.createElement('li');
    li.textContent = fmt(current);
    lapsList.insertBefore(li, lapsList.firstChild);
  });

})();
