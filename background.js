let extractedTranscript = "";

let geminiMessageQueue = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "TRANSCRIPT_READY") {
    extractedTranscript = request.text;
    let targetUrl = "https://gemini.google.com/app";
    geminiMessageQueue.push({ action: "START_GEMINI", text: extractedTranscript, senderTabId: sender.tab.id });
    chrome.tabs.create({ url: targetUrl, active: true });
  }

  if (request.action === "GEMINI_LOADED") {
    tabId = sender.tab.id;
    if (geminiMessageQueue.length > 0) {
      let message = geminiMessageQueue.shift();
      chrome.tabs.sendMessage(tabId, message);
    }
  }

  if (request.action === "CHANGE_FOCUS") {
    chrome.tabs.update(request.tabId, { active: true });
  }
});