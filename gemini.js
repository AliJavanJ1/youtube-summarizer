function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const userPrompt = "Rewrite the content of this video transcript in such detail that reading it provides a comprehensive understanding equivalent to watching the entire video carefully. Ensure all key information, nuances, and events are preserved. Constraint: Use only Persian characters in your response.";


waitForElement("button[aria-label='Temporary chat']").then((tempIcon) => {
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "START_GEMINI") {
      tempIcon.click();
      await waitForElement(".temporary-chat-card");
      let modePicker = await waitForElement("[aria-label^='Open mode picker']");

      modePicker.click();
      await waitForElement('gem-menu-item');
      var menu_itmes = document.querySelectorAll('gem-menu-item');
      menu_itmes[menu_itmes.length - 3].click();
      
      modePicker.click();
      await waitForElement('gem-menu-item');
      menu_itmes = document.querySelectorAll('gem-menu-item');
      menu_itmes[menu_itmes.length - 1].click();

    //   await waitForElement("gem-menu-item gem-menu-item, gem-menu-item+div gem-menu-item");
    //   menu_itmes = document.querySelectorAll("gem-menu-item gem-menu-item, gem-menu-item+div gem-menu-item");
    //   menu_itmes[menu_itmes.length - 1].click();

      let editor = await waitForElement("rich-textarea")
      editor.focus();
      document.execCommand("insertText", false, userPrompt + "\r\n\r\n" + request.text);
      let sendBtn = await waitForElement('button[aria-label="Send message"]');
      setTimeout(() => sendBtn.click(), 500);
      chrome.runtime.sendMessage({ action: "CHANGE_FOCUS", tabId: request.senderTabId });
    }
  });
  chrome.runtime.sendMessage({ action: "GEMINI_LOADED" });
});
