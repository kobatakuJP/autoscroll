document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'start' });
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stop' });
  });
  
  document.getElementById('speed').addEventListener('input', (event) => {
    const speed = parseInt(event.target.value, 10);
    chrome.runtime.sendMessage({ action: 'setSpeed', speed: speed });
  });
  