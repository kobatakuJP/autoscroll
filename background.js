let scrollIntervalId = null;
let scrollSpeed = 100; // Default scroll speed in milliseconds

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    if (!scrollIntervalId) {
      scrollIntervalId = setInterval(() => {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: () => window.scrollBy(0, 10) // Adjust 10 to change the scroll amount
        });
      }, scrollSpeed);
    }
  } else if (message.action === 'stop') {
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId);
      scrollIntervalId = null;
    }
  } else if (message.action === 'setSpeed') {
    scrollSpeed = message.speed;
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId);
      scrollIntervalId = setInterval(() => {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: () => window.scrollBy(0, 10) // Adjust 10 to change the scroll amount
        });
      }, scrollSpeed);
    }
  }
});
