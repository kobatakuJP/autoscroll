let scrollIntervalId = null;
let scrollSpeed = 1000 / 30; // Default scroll speed in milliseconds
let scrollH = 1; // スクロールする縦幅

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = message.tabId;

  if (!tabId) {
    console.error('No tabId provided in message.');
    return;
  }

  if (message.action === 'start') {
    if (!scrollIntervalId) {
      scrollIntervalId = setInterval(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: (scrollAmount) => window.scrollBy(0, scrollAmount),
          args: [scrollH]
        }).catch(error => console.error('Error executing script:', error));
      }, scrollSpeed);
    }
  } else if (message.action === 'stop') {
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId);
      scrollIntervalId = null;
    }
  } else if (message.action === 'setSpeed') {
    scrollH = message.speed;
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId);
      scrollIntervalId = setInterval(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: (scrollAmount) => window.scrollBy(0, scrollAmount),
          args: [scrollH]
        }).catch(error => console.error('Error executing script:', error));
      }, scrollSpeed);
    }
  }
});
