document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ action: 'start', tabId: tabId });
    });
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ action: 'stop', tabId: tabId });
    });
  });
  
  document.getElementById('speed').addEventListener('input', (event) => {
    const speed = parseInt(event.target.value, 10);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ action: 'setSpeed', speed: speed, tabId: tabId });
    });
  });
  